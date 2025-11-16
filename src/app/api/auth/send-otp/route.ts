import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { adminDb, adminAuth } from "@/lib/firebaseAdmin";
import { generateOTPEmailTemplate } from "@/lib/emails/otp-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    if (!adminDb || !adminAuth) {
      return NextResponse.json(
        { error: "Services not initialized" },
        { status: 500 }
      );
    }

    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Check if email is already registered
    try {
      await adminAuth.getUserByEmail(email);
      return NextResponse.json(
        {
          error:
            "This email is already registered. Please use a different email or try logging in.",
        },
        { status: 400 }
      );
    } catch (error) {
      // If error code is 'auth/user-not-found', it means email is not registered, which is what we want
      const firebaseError = error as { code?: string };
      if (firebaseError.code !== "auth/user-not-found") {
        console.error("Error checking user existence:", error);
        return NextResponse.json(
          { error: "Failed to verify email" },
          { status: 500 }
        );
      }
      // Email is not registered, continue with OTP sending
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store OTP in Firestore with expiration (5 minutes)
    const otpRef = adminDb.collection("otps").doc(email);
    await otpRef.set({
      otp,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
    });

    // Send email with OTP
    const emailHtml = generateOTPEmailTemplate(otp);

    const result = await resend.emails.send({
      from: "onboarding@resend.dev", // Use Resend's test domain
      to: email,
      subject: "Your OTP for Email Verification - SuperKlean",
      html: emailHtml,
    });

    // Check if Resend returned an error
    if (result.error) {
      console.error("Resend error:", result.error);
      // For development, if it's the domain restriction, provide helpful message
      const errorObj = result.error as { message?: string };
      const errorMessage = errorObj.message || "";
      if (errorMessage.includes("testing emails")) {
        return NextResponse.json(
          {
            error:
              "Failed to send email. Please contact support at itfsu.fitsixes@gmail.com for assistance.",
          },
          { status: 400 }
        );
      }
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    console.log("Email sent successfully:", result.data);

    return NextResponse.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}
