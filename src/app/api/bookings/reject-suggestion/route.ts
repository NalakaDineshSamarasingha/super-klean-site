import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { bookingId } = body;

    if (!bookingId) {
      return NextResponse.json(
        { error: 'Booking ID is required' },
        { status: 400 }
      );
    }

    const bookingRef = adminDb.collection('bookings').doc(bookingId);
    const bookingDoc = await bookingRef.get();

    if (!bookingDoc.exists) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    // Update booking status to cancelled
    await bookingRef.update({
      status: 'cancelled',
      suggestedDate: null,
      suggestedTime: null,
      adminNote: null,
      updatedAt: new Date(),
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Booking cancelled successfully',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error rejecting suggestion:', error);
    return NextResponse.json(
      { error: 'Failed to cancel booking', details: error.message },
      { status: 500 }
    );
  }
}
