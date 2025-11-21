import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';
import { FieldValue } from 'firebase-admin/firestore';

export async function POST(request: NextRequest) {
  try {
    if (!adminDb) {
      return NextResponse.json(
        { error: 'Database not initialized' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const {
      userId,
      rating,
      comment,
      service,
    } = body;

    // Validate required fields
    if (!userId || !rating || !comment) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate rating
    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    // Fetch user data from users collection
    const userDoc = await adminDb.collection('users').doc(userId).get();
    
    if (!userDoc.exists) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const userData = userDoc.data();
    const userName = userData?.username || 'Anonymous';
    const userEmail = userData?.email || '';

    // Create review document
    const reviewData = {
      userId,
      userName,
      userEmail: userEmail || '',
      rating,
      comment,
      service: service || '',
      status: 'pending', // pending, approved, rejected
      isPublished: false,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    };

    const docRef = await adminDb.collection('reviews').add(reviewData);

    return NextResponse.json(
      {
        success: true,
        reviewId: docRef.id,
        message: 'Review submitted successfully',
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating review:', error);
    return NextResponse.json(
      { error: 'Failed to create review', details: error.message },
      { status: 500 }
    );
  }
}
