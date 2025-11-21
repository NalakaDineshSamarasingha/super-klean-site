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

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      );
    }

    // Query bookings for the specific user
    let bookingsSnapshot;
    try {
      // Try with orderBy first
      bookingsSnapshot = await adminDb
        .collection('bookings')
        .where('userId', '==', userId)
        .orderBy('createdAt', 'desc')
        .get();
    } catch (orderError: any) {
      // If index is missing, fall back to simple query
      console.log('OrderBy failed, using simple query:', orderError.message);
      bookingsSnapshot = await adminDb
        .collection('bookings')
        .where('userId', '==', userId)
        .get();
    }

    const bookings = bookingsSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        userId: data.userId,
        email: data.email || '',
        fullName: data.fullName || '',
        phoneNumber: data.phoneNumber || '',
        vehicleNumber: data.vehicleNumber || '',
        service: data.service || '',
        preferredDate: data.preferredDate || '',
        preferredTime: data.preferredTime || '',
        specialNotes: data.specialNotes || '',
        status: data.status || 'pending',
        createdAt: data.createdAt?.toDate().toISOString() || new Date().toISOString(),
        updatedAt: data.updatedAt?.toDate().toISOString() || new Date().toISOString(),
      };
    });

    // Sort by createdAt client-side if needed
    bookings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json(
      {
        success: true,
        bookings,
        count: bookings.length,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings', details: error.message },
      { status: 500 }
    );
  }
}
