import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { bookingId, suggestedDate, suggestedTime, adminNote } = body;

    if (!bookingId || !suggestedDate || !suggestedTime) {
      return NextResponse.json(
        { error: 'Booking ID, suggested date, and suggested time are required' },
        { status: 400 }
      );
    }

    // Update booking with suggested date/time and status
    const bookingRef = adminDb.collection('bookings').doc(bookingId);
    const bookingDoc = await bookingRef.get();

    if (!bookingDoc.exists) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    await bookingRef.update({
      status: 'suggestion_pending',
      suggestedDate,
      suggestedTime,
      adminNote: adminNote || '',
      updatedAt: new Date(),
    });

    // TODO: Send email/notification to customer about the suggestion
    // You can integrate with Resend API here similar to OTP emails

    return NextResponse.json(
      {
        success: true,
        message: 'Date/Time suggestion sent to customer successfully',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error sending date/time suggestion:', error);
    return NextResponse.json(
      { error: 'Failed to send suggestion', details: error.message },
      { status: 500 }
    );
  }
}
