import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    if (!adminDb) {
      return NextResponse.json(
        { error: 'Services not initialized' },
        { status: 500 }
      );
    }

    const { uid } = await request.json();

    if (!uid) {
      return NextResponse.json(
        { error: 'UID is required' },
        { status: 400 }
      );
    }

    // Get user document
    const userDoc = await adminDb.collection('users').doc(uid).get();

    if (!userDoc.exists) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const userData = userDoc.data();

    // Generate new OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Update OTP in Firestore
    await adminDb.collection('users').doc(uid).update({
      otp,
      otpExpiry,
      updatedAt: new Date(),
    });

    // Send OTP email
    await resend.emails.send({
      from: 'SuperKlean <noreply@superkleen.online>',
      to: userData?.email,
      subject: 'New Verification Code - SuperKlean',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #000; color: #fff; padding: 20px; text-align: center; }
              .content { background-color: #f9f9f9; padding: 30px; border-radius: 5px; margin-top: 20px; }
              .otp { font-size: 32px; font-weight: bold; color: #FF5733; text-align: center; letter-spacing: 5px; margin: 20px 0; }
              .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>SUPER KLEAN</h1>
              </div>
              <div class="content">
                <h2>New Verification Code</h2>
                <p>Here is your new verification code:</p>
                <div class="otp">${otp}</div>
                <p>This OTP will expire in 10 minutes.</p>
              </div>
              <div class="footer">
                <p>&copy; 2025 SuperKlean. All rights reserved.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    return NextResponse.json({
      success: true,
      message: 'OTP resent successfully',
    });
  } catch (error: any) {
    console.error('Resend OTP error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to resend OTP' },
      { status: 500 }
    );
  }
}
