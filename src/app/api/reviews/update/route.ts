import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';
import { FieldValue } from 'firebase-admin/firestore';

export async function PUT(request: NextRequest) {
  try {
    if (!adminDb) {
      return NextResponse.json(
        { error: 'Database not initialized' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { reviewId, status, isPublished } = body;

    if (!reviewId) {
      return NextResponse.json(
        { error: 'reviewId is required' },
        { status: 400 }
      );
    }

    // Get the review document
    const reviewRef = adminDb.collection('reviews').doc(reviewId);
    const reviewDoc = await reviewRef.get();

    if (!reviewDoc.exists) {
      return NextResponse.json(
        { error: 'Review not found' },
        { status: 404 }
      );
    }

    // Prepare update data
    const updates: any = {
      updatedAt: FieldValue.serverTimestamp(),
    };

    // Validate and update status if provided
    if (status) {
      const validStatuses = ['pending', 'approved', 'rejected'];
      if (!validStatuses.includes(status)) {
        return NextResponse.json(
          { error: 'Invalid status. Must be one of: pending, approved, rejected' },
          { status: 400 }
        );
      }
      updates.status = status;
    }

    // Update published status if provided
    if (isPublished !== undefined) {
      updates.isPublished = isPublished;
    }

    await reviewRef.update(updates);

    return NextResponse.json(
      {
        success: true,
        message: 'Review updated successfully',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error updating review:', error);
    return NextResponse.json(
      { error: 'Failed to update review', details: error.message },
      { status: 500 }
    );
  }
}
