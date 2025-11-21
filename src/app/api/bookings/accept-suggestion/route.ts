import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';

export async function PUT(request: NextRequest) {
  try {
    if (!adminDb) {
      return NextResponse.json(
        { error: 'Database not initialized' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { bookingId, suggestedDate, suggestedTime } = body;

    if (!bookingId || !suggestedDate || !suggestedTime) {
      return NextResponse.json(
        { error: 'Booking ID, suggested date, and suggested time are required' },
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

    // Update booking with accepted suggestion
    await bookingRef.update({
      preferredDate: suggestedDate,
      preferredTime: suggestedTime,
      status: 'approved',
      suggestedDate: null,
      suggestedTime: null,
      adminNote: null,
      updatedAt: new Date(),
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Suggestion accepted and booking updated successfully',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error accepting suggestion:', error);
    return NextResponse.json(
      { error: 'Failed to accept suggestion', details: error.message },
      { status: 500 }
    );
  }
}
