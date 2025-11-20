import Link from 'next/link';
import Hero from '@/components/Hero';
import ServiceCategories from '@/components/ServiceCategories';
import ContactInfo from '@/components/ContactInfo';
import BookingCTA from '@/components/BookingCTA';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <Hero />

      {/* Service Categories Section */}
      <ServiceCategories />

      {/* Contact Info Section */}
      <ContactInfo />

      {/* Booking CTA Section */}
      <BookingCTA />

      
    </main>
  );
}
