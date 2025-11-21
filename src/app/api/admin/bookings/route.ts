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
    const status = searchParams.get('status');

    let query = adminDb.collection('bookings');

    // Filter by status if provided
    if (status) {
      query = query.where('status', '==', status) as any;
    }

    const bookingsSnapshot = await query.get();

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
        suggestedDate: data.suggestedDate || null,
        suggestedTime: data.suggestedTime || null,
        adminNote: data.adminNote || null,
        createdAt: data.createdAt?.toDate().toISOString() || new Date().toISOString(),
        updatedAt: data.updatedAt?.toDate().toISOString() || new Date().toISOString(),
      };
    });

    // Sort by createdAt descending
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
    console.error('Error fetching admin bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings', details: error.message },
      { status: 500 }
    );
  }
}
