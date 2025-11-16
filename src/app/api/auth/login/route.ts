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

    const { identifier, password } = await request.json();

    if (!identifier || !password) {
      return NextResponse.json(
        { error: "Identifier (email or username) and password are required" },
        { status: 400 }
      );
    }

    let email = identifier;

    // Check if identifier is email or username
    if (!identifier.includes("@")) {
      // Treat as username, find email from users collection
      const usersRef = adminDb.collection("users");
      const querySnapshot = await usersRef
        .where("username", "==", identifier)
        .limit(1)
        .get();

      if (querySnapshot.empty) {
        return NextResponse.json(
          { error: "Invalid username or password" },
          { status: 401 }
        );
      }

      const userDoc = querySnapshot.docs[0];
      email = userDoc.data().email;
    }

    // Use Firebase Auth REST API to login
    const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Firebase API key not configured" },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Firebase Auth error:", data);
      return NextResponse.json(
        { error: data.error?.message || "Invalid email or password" },
        { status: 401 }
      );
    }

    // Fetch user data from Firestore to get role and company info
    const userDoc = await adminDb.collection("users").doc(data.localId).get();
    if (!userDoc.exists) {
      return NextResponse.json(
        { error: "User data not found" },
        { status: 404 }
      );
    }
    const userData = userDoc.data();

    // Fetch company ID based on user's email
    let companyId = null;
    let companyName = null;
    let isSponsor = false;
    let sponsorType = null;

    if (userData?.role === "company") {
      // Find company by email
      const companiesRef = adminDb.collection("companies");
      const companySnapshot = await companiesRef
        .where("email", "==", email)
        .limit(1)
        .get();

      if (!companySnapshot.empty) {
        const companyDoc = companySnapshot.docs[0];
        const companyData = companyDoc.data();
        companyId = companyDoc.id;
        companyName = companyData.name;

        // Generate originalname (lowercase without spaces) from company name
        const originalname = companyName.toLowerCase().replace(/\s+/g, "");

        // Check if this company is a sponsor by matching originalname
        const sponsorCompaniesRef = adminDb.collection("sponsorcompanies");
        const sponsorSnapshot = await sponsorCompaniesRef
          .where("originalname", "==", originalname)
          .limit(1)
          .get();
        
        // If a matching sponsor company is found, grant sponsor privileges and get type
        if (!sponsorSnapshot.empty) {
          isSponsor = true;
          const sponsorData = sponsorSnapshot.docs[0].data();
          sponsorType = sponsorData.sponsorType; // platinum, gold, or silver
          console.log("=== LOGIN API DEBUG ===");
          console.log("Found sponsor company:", originalname);
          console.log("Sponsor data:", sponsorData);
          console.log("Sponsor type:", sponsorType);
        } else {
          console.log("=== LOGIN API DEBUG ===");
          console.log("No sponsor found for:", originalname);
        }
      }
    }

    // Return successful login data
    return NextResponse.json({
      message: "Login successful",
      user: {
        uid: data.localId,
        email: data.email,
        displayName: data.displayName,
        idToken: data.idToken,
        refreshToken: data.refreshToken,
        expiresIn: data.expiresIn,
        role: userData?.role || "user",
        companyId,
        companyName,
        isSponsor,
        sponsorType,
      },
    });
  } catch (error) {
    console.error("Error logging in:", error);
    return NextResponse.json({ error: "Failed to login" }, { status: 500 });
  }
}
