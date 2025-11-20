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
      email,
      fullName,
      phoneNumber,
      vehicleNumber,
      service,
      preferredDate,
      preferredTime,
      specialNotes,
    } = body;

    // Validate required fields
    if (!userId || !fullName || !phoneNumber || !vehicleNumber || !service || !preferredDate || !preferredTime) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create booking document
    const bookingData = {
      userId,
      email: email || '',
      fullName,
      phoneNumber,
      vehicleNumber,
      service,
      preferredDate,
      preferredTime,
      specialNotes: specialNotes || '',
      status: 'pending',
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    };

    const docRef = await adminDb.collection('bookings').add(bookingData);

    return NextResponse.json(
      {
        success: true,
        bookingId: docRef.id,
        message: 'Booking created successfully',
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Failed to create booking', details: error.message },
      { status: 500 }
    );
  }
}
