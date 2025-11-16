import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

export async function POST(request: NextRequest) {
  try {
    if (!adminDb) {
      return NextResponse.json(
        { error: "Database not initialized" },
        { status: 500 }
      );
    }

    const { username } = await request.json();

    if (!username) {
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 }
      );
    }

    // Get user by username
    const usersRef = adminDb.collection("users");
    const querySnapshot = await usersRef
      .where("username", "==", username)
      .limit(1)
      .get();

    if (querySnapshot.empty) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();
    const email = userData.email;

    if (!email) {
      return NextResponse.json(
        { error: "Email not found for user" },
        { status: 404 }
      );
    }

    return NextResponse.json({ email });
  } catch (error) {
    console.error("Error getting email by username:", error);
    return NextResponse.json(
      { error: "Failed to get email by username" },
      { status: 500 }
    );
  }
}
