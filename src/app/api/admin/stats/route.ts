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

    // Get total users count
    const usersSnapshot = await adminDb.collection('users').get();
    const totalUsers = usersSnapshot.size;

    // Get total bookings count
    const bookingsSnapshot = await adminDb.collection('bookings').get();
    const totalBookings = bookingsSnapshot.size;

    // Get pending bookings count
    const pendingBookingsSnapshot = await adminDb
      .collection('bookings')
      .where('status', '==', 'pending')
      .get();
    const totalPendingBookings = pendingBookingsSnapshot.size;

    return NextResponse.json(
      {
        success: true,
        stats: {
          totalUsers,
          totalBookings,
          totalPendingBookings,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats', details: error.message },
      { status: 500 }
    );
  }
}
