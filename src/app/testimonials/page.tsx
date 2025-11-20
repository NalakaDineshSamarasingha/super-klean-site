'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface Testimonial {
  name: string;
  rating: number;
  review: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Kasun D.',
    rating: 5,
    review: 'Super professional service. My car looks perfect every time.',
    avatar: 'K'
  },
  {
    name: 'Tharindi S.',
    rating: 5,
    review: 'Friendly staff and quick service. Highly recommended.',
    avatar: 'T'
  },
  {
    name: 'Ishara P.',
    rating: 5,
    review: 'Affordable and reliable. Best car wash in the area!',
    avatar: 'I'
  },
  {
    name: 'Fahim R.',
    rating: 5,
    review: 'Great packages with value for money. Excellent results.',
    avatar: 'F'
  }
];

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg
    className={`w-5 h-5 sm:w-6 sm:h-6 ${filled ? 'text-[#FF5733]' : 'text-gray-600'}`}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export default function TestimonialsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleBooking = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      router.push('/login');
    } else {
      router.push('/booking');
    }
  };

  return (
    <main className="min-h-screen bg-black text-white pt-20">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 md:py-24 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 -top-48 -left-48 bg-[#FF5733] opacity-10 blur-[100px] rounded-full"></div>
          <div className="absolute w-96 h-96 top-1/2 right-0 bg-[#FF5733] opacity-5 blur-[120px] rounded-full"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 text-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-[#FF5733]/10 border border-[#FF5733]/30 rounded-full"
          >
            <svg className="w-5 h-5 text-[#FF5733]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-[#FF5733] text-sm font-semibold uppercase tracking-wider">Customer Reviews</span>
          </motion.div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-wider leading-tight uppercase font-(family-name:--font-teko) mb-6 sm:mb-8 px-4">
            WHAT OUR <span className="text-[#FF5733]">CUSTOMERS SAY</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-400 leading-relaxed">
            Real feedback from our valued customers
          </p>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="group bg-linear-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6 sm:p-8 text-center hover:border-[#FF5733] transition-all duration-300 hover:shadow-xl hover:shadow-[#FF5733]/20 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-br from-[#FF5733]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="text-4xl sm:text-5xl font-bold text-[#FF5733] mb-2 font-[--font-teko]">
                  500+
                </div>
                <div className="text-gray-400 text-sm sm:text-base font-medium">Happy Customers</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -5 }}
              className="group bg-linear-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6 sm:p-8 text-center hover:border-[#FF5733] transition-all duration-300 hover:shadow-xl hover:shadow-[#FF5733]/20 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-br from-[#FF5733]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="text-4xl sm:text-5xl font-bold text-[#FF5733] mb-2 font-[--font-teko] flex items-center justify-center gap-1">
                  4.9
                  <svg className="w-8 h-8 text-[#FF5733]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div className="text-gray-400 text-sm sm:text-base font-medium">Average Rating</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -5 }}
              className="group bg-linear-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6 sm:p-8 text-center hover:border-[#FF5733] transition-all duration-300 hover:shadow-xl hover:shadow-[#FF5733]/20 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-br from-[#FF5733]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="text-4xl sm:text-5xl font-bold text-[#FF5733] mb-2 font-[--font-teko]">
                  100%
                </div>
                <div className="text-gray-400 text-sm sm:text-base font-medium">Satisfaction</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <div className="bg-linear-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6 sm:p-8 h-full hover:border-[#FF5733] transition-all duration-500 hover:shadow-xl hover:shadow-[#FF5733]/20 relative overflow-hidden">
                  {/* Decorative Corner */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-[#FF5733]/10 blur-2xl rounded-full transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-500"></div>
                  
                  <div className="relative z-10">
                    {/* Stars */}
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0, rotate: -180 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 * i, type: "spring" }}
                        >
                          <StarIcon filled={i < testimonial.rating} />
                        </motion.div>
                      ))}
                    </div>

                    {/* Review Text */}
                    <blockquote className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8 relative">
                      <svg className="absolute -top-2 -left-1 w-8 h-8 text-[#FF5733]/20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                      <span className="relative italic">"{testimonial.review}"</span>
                    </blockquote>

                    {/* Customer Info */}
                    <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="relative w-12 h-12 sm:w-14 sm:h-14 bg-linear-to-br from-[#FF5733] to-[#E64A2E] rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-[#FF5733]/30"
                    >
                      <span className="text-white font-bold text-lg sm:text-xl">
                        {testimonial.avatar}
                      </span>
                      <div className="absolute inset-0 rounded-full border-2 border-white/20"></div>
                    </motion.div>

                    {/* Name */}
                    <div>
                      <div className="text-white font-semibold text-lg sm:text-xl">
                        {testimonial.name}
                      </div>
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Verified Customer
                      </div>
                    </div>
                  </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700 rounded-3xl p-8 sm:p-10 md:p-12 text-center overflow-hidden shadow-2xl"
          >
            {/* Quote Icon */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 text-[#FF5733]/10">
              <svg className="w-16 h-16 sm:w-20 sm:h-20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>

            {/* Decorative Circles */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#FF5733]/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#FF5733]/10 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 font-[--font-teko] tracking-wide">
                Your Satisfaction is Our Priority
              </h2>
              <p className="text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                We take pride in delivering exceptional service to every customer. Your trust and satisfaction drive us to maintain the highest standards of quality and care.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center bg-gray-900 border border-gray-800 rounded-2xl p-8 sm:p-10 md:p-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 font-[--font-teko] tracking-wide">
              Ready to Experience the Difference?
            </h2>
            <p className="text-gray-400 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
              Join hundreds of satisfied customers who trust us with their vehicles
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                onClick={handleBooking}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="relative bg-[#FF5733] text-white px-8 py-3 rounded-xl font-semibold text-lg hover:bg-[#E64A2E] transition-all duration-300 w-full sm:w-auto shadow-lg shadow-[#FF5733]/30 overflow-hidden group/book cursor-pointer"
              >
                <span className="relative z-10">BOOK NOW</span>
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/book:translate-y-0 transition-transform duration-300"></div>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="relative bg-transparent border-2 border-[#FF5733] text-[#FF5733] px-8 py-3 rounded-xl font-semibold text-lg hover:bg-[#FF5733] hover:text-white transition-all duration-300 w-full sm:w-auto overflow-hidden group/view"
              >
                <span className="relative z-10">VIEW PLANS</span>
                <div className="absolute inset-0 bg-[#FF5733] -translate-x-full group-hover/view:translate-x-0 transition-transform duration-300"></div>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
