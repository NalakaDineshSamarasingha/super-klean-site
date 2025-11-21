import { NextRequest, NextResponse } from 'next/server';
import { adminDb, adminAuth } from '@/lib/firebaseAdmin';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Fetch user document from Firestore
    const userDoc = await adminDb.collection('users').doc(userId).get();

    if (!userDoc.exists) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const userData = userDoc.data();

    return NextResponse.json(
      {
        success: true,
        user: {
          fullName: userData?.fullName || '',
          mobileNumber: userData?.mobileNumber || '',
          username: userData?.username || '',
          email: userData?.email || '',
          role: userData?.role || 'customer',
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user data', details: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { fullName, mobileNumber, username } = body;

    // Validate inputs
    if (!fullName || !mobileNumber || !username) {
      return NextResponse.json(
        { error: 'Full name, mobile number, and username are required' },
        { status: 400 }
      );
    }

    // Validate mobile number (exactly 10 digits)
    if (!/^\d{10}$/.test(mobileNumber)) {
      return NextResponse.json(
        { error: 'Mobile number must be exactly 10 digits' },
        { status: 400 }
      );
    }

    // Check if username is already taken by another user
    const usernameQuery = await adminDb
      .collection('users')
      .where('username', '==', username)
      .get();

    if (!usernameQuery.empty) {
      const existingUser = usernameQuery.docs[0];
      if (existingUser.id !== userId) {
        return NextResponse.json(
          { error: 'Username is already taken' },
          { status: 400 }
        );
      }
    }

    // Update user document in Firestore
    await adminDb.collection('users').doc(userId).update({
      fullName,
      mobileNumber,
      username,
      updatedAt: new Date(),
    });

    // Update display name in Firebase Auth
    await adminAuth.updateUser(userId, {
      displayName: fullName,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Profile updated successfully',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Failed to update user data', details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Delete user document from Firestore
    await adminDb.collection('users').doc(userId).delete();

    // Delete user from Firebase Auth
    await adminAuth.deleteUser(userId);

    return NextResponse.json(
      {
        success: true,
        message: 'Account deleted successfully',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { error: 'Failed to delete account', details: error.message },
      { status: 500 }
    );
  }
}
