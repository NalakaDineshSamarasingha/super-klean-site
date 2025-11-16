import { NextResponse } from "next/server";

export async function POST() {
  try {
    // For Firebase, logout is typically handled on the client side
    // But we can provide an endpoint for consistency and potential server-side cleanup

    // You could revoke the refresh token here if needed
    // const { refreshToken } = await request.json();

    // For now, we'll just return success
    // The client will handle clearing local storage and Firebase auth state

    return NextResponse.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error logging out:", error);
    return NextResponse.json({ error: "Failed to logout" }, { status: 500 });
  }
}
