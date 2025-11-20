import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';

export async function GET(request: NextRequest) {
  try {
    if (!adminDb) {
      return NextResponse.json(
        { error: 'Database not initialized' },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const status = searchParams.get('status');
    const isPublished = searchParams.get('isPublished');

    let reviewsSnapshot;

    try {
      // Build query based on filters
      if (userId && status) {
        reviewsSnapshot = await adminDb
          .collection('reviews')
          .where('userId', '==', userId)
          .where('status', '==', status)
          .get();
      } else if (userId && isPublished !== null && isPublished !== undefined) {
        reviewsSnapshot = await adminDb
          .collection('reviews')
          .where('userId', '==', userId)
          .where('isPublished', '==', isPublished === 'true')
          .get();
      } else if (status && isPublished !== null && isPublished !== undefined) {
        reviewsSnapshot = await adminDb
          .collection('reviews')
          .where('status', '==', status)
          .where('isPublished', '==', isPublished === 'true')
          .get();
      } else if (userId) {
        reviewsSnapshot = await adminDb
          .collection('reviews')
          .where('userId', '==', userId)
          .get();
      } else if (status) {
        reviewsSnapshot = await adminDb
          .collection('reviews')
          .where('status', '==', status)
          .get();
      } else if (isPublished !== null && isPublished !== undefined) {
        reviewsSnapshot = await adminDb
          .collection('reviews')
          .where('isPublished', '==', isPublished === 'true')
          .get();
      } else {
        reviewsSnapshot = await adminDb.collection('reviews').get();
      }
    } catch (queryError: any) {
      console.log('Query error, falling back to simple query:', queryError.message);
      reviewsSnapshot = await adminDb.collection('reviews').get();
    }

    let reviews = reviewsSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        userId: data.userId,
        userName: data.userName || '',
        userEmail: data.userEmail || '',
        rating: data.rating || 0,
        comment: data.comment || '',
        service: data.service || '',
        status: data.status || 'pending',
        isPublished: data.isPublished || false,
        createdAt: data.createdAt?.toDate().toISOString() || new Date().toISOString(),
        updatedAt: data.updatedAt?.toDate().toISOString() || new Date().toISOString(),
      };
    });

    // Client-side filtering if query failed
    if (userId && !reviews.every(r => r.userId === userId)) {
      reviews = reviews.filter(r => r.userId === userId);
    }
    if (status && !reviews.every(r => r.status === status)) {
      reviews = reviews.filter(r => r.status === status);
    }
    if (isPublished !== null && isPublished !== undefined) {
      const publishedValue = isPublished === 'true';
      reviews = reviews.filter(r => r.isPublished === publishedValue);
    }

    // Sort by createdAt descending
    reviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json(
      {
        success: true,
        reviews,
        count: reviews.length,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews', details: error.message },
      { status: 500 }
    );
  }
}
