import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebaseAdmin';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    if (!adminDb || !adminAuth) {
      return NextResponse.json(
        { error: 'Services not initialized' },
        { status: 500 }
      );
    }

    const { firstName, lastName, username, email, password } = await request.json();

    // Validate input
    if (!firstName || !lastName || !username || !email || !password) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check if username already exists
    const usersRef = adminDb.collection('users');
    const usernameQuery = await usersRef.where('username', '==', username).get();
    
    if (!usernameQuery.empty) {
      return NextResponse.json(
        { error: 'Username already exists' },
        { status: 400 }
      );
    }

    // Create user in Firebase Auth
    const userRecord = await adminAuth.createUser({
      email,
      password,
      emailVerified: false,
    });

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Store user data in Firestore
    await adminDb.collection('users').doc(userRecord.uid).set({
      username,
      firstName,
      lastName,
      email,
      role: 'customer', // Default role
      emailVerified: false,
      otp,
      otpExpiry,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Send OTP email using Resend
    try {
      await resend.emails.send({
        from: 'SuperKlean <onboarding@resend.dev>',
        to: email,
        subject: 'Verify Your Email - SuperKlean',
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
                  <h1>SUPER KLEEN</h1>
                </div>
                <div class="content">
                  <h2>Welcome, ${firstName}!</h2>
                  <p>Thank you for signing up with SuperKlean. To complete your registration, please verify your email address using the OTP below:</p>
                  <div class="otp">${otp}</div>
                  <p>This OTP will expire in 10 minutes.</p>
                  <p>If you didn't create an account with SuperKlean, please ignore this email.</p>
                </div>
                <div class="footer">
                  <p>&copy; 2025 SuperKlean. All rights reserved.</p>
                </div>
              </div>
            </body>
          </html>
        `,
      });
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      // Continue even if email fails
    }

    return NextResponse.json({
      success: true,
      uid: userRecord.uid,
      message: 'User created successfully. Please verify your email.',
    });
  } catch (error: any) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create user' },
      { status: 500 }
    );
  }
}
