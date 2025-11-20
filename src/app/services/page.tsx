'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface Service {
  title: string;
  description: string;
  includes: string[];
  time: string;
  icon: ReactNode;
}

const services: Service[] = [
  {
    title: 'Exterior Wash',
    description: 'A complete exterior cleaning package that removes dirt, dust, and grime.',
    includes: ['High-pressure wash', 'shampoo', 'rinse', 'and dry'],
    time: '20–30 minutes',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 008 10.172V5L7 4z" />
      </svg>
    )
  },
  {
    title: 'Interior Detailing',
    description: 'Deep cleaning for the interior to keep your vehicle fresh and hygienic.',
    includes: ['Vacuum', 'dashboard cleaning', 'seat care', 'glass cleaning'],
    time: '30–45 minutes',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    title: 'Under Wash',
    description: 'Protect your vehicle from rust and buildup.',
    includes: ['High-pressure undercarriage cleaning'],
    time: '20 minutes',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  },
  {
    title: 'Full Service Wash',
    description: 'Complete inside and outside cleaning.',
    includes: ['Exterior wash + interior vacuum + dashboard polish'],
    time: '45–60 minutes',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    )
  },
  {
    title: 'Cut & Polish',
    description: 'Bring back your vehicle\'s shine with professional polishing.',
    includes: ['Waxing', 'polishing', 'minor scratch removal'],
    time: '2–3 hours',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    )
  },
  {
    title: 'Body Wash',
    description: 'A quick and efficient body wash for regular maintenance.',
    includes: ['Exterior cleaning and drying'],
    time: '15–20 minutes',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  }
];

export default function ServicesPage() {
  const { user } = useAuth();
  const router = useRouter();

  const handleBooking = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      router.push('/login');
    } else {
      router.push('/booking');
    }
  };

  return (
    <main className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-20">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/bg.jpg"
            alt="Services background"
            fill
            className="object-cover opacity-40"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-linear-to-b from-black via-black/80 to-black"></div>
        </div>

        {/* Hero Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 text-center"
        >
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="border-l-4 border-[#FF5733] pl-4 inline-block mb-4 sm:mb-6"
          >
            <p className="text-gray-300 uppercase tracking-wider text-xs sm:text-sm">Quality and care in every service</p>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-wider leading-tight uppercase font-(family-name:--font-teko) mb-6 sm:mb-8 px-4"
          >
            OUR <span className="text-[#FF5733]">SERVICES</span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-full flex justify-center items-center px-4"
          >
            <div className="relative max-w-4xl w-full">
              {/* Decorative lines */}
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-20 w-12 sm:w-16 h-0.5 bg-[#FF5733] hidden lg:block"></div>
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-20 w-12 sm:w-16 h-0.5 bg-[#FF5733] hidden lg:block"></div>
              
              {/* Main text */}
              <div className="bg-linear-to-r from-gray-900/40 via-gray-800/60 to-gray-900/40 backdrop-blur-sm border border-gray-700/50 rounded-lg p-6 sm:p-8 md:p-10 lg:px-24 lg:py-12">
                <p className="text-gray-200 text-lg sm:text-xl md:text-2xl leading-relaxed text-center">
                  Discover our comprehensive range of professional services
                  <span className="block mt-3 text-[#FF5733] font-semibold tracking-wide text-xl sm:text-2xl">
                    Crafted with Quality and Care
                  </span>
                </p>
                
                {/* Stats or highlights */}
                <div className="flex flex-wrap justify-center gap-8 sm:gap-12 md:gap-16 mt-8 pt-8 border-t border-gray-700/50">
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl font-bold text-[#FF5733] mb-1">6+</div>
                    <div className="text-xs sm:text-sm uppercase tracking-wider text-gray-400">Services</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl font-bold text-[#FF5733] mb-1">100%</div>
                    <div className="text-xs sm:text-sm uppercase tracking-wider text-gray-400">Quality</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl font-bold text-[#FF5733] mb-1">Expert</div>
                    <div className="text-xs sm:text-sm uppercase tracking-wider text-gray-400">Team</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="py-16 lg:py-24">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 justify-items-center">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="w-full max-w-sm group bg-linear-to-br from-gray-900 to-black border border-gray-800 hover:border-[#FF5733] transition-all duration-500 p-6 sm:p-8 relative overflow-hidden hover:shadow-2xl hover:shadow-[#FF5733]/20"
              >
                {/* Hover Effect Background */}
                <div className="absolute inset-0 bg-linear-to-br from-[#FF5733]/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                
                {/* Animated shine effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute top-0 -left-full h-full w-1/2 bg-linear-to-r from-transparent via-white/10 to-transparent transform skew-x-12 group-hover:animate-shine"></div>
                </div>
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="text-[#FF5733] mb-6 w-12 h-12 group-hover:text-white transition-colors duration-300"
                  >
                    {service.icon}
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold uppercase tracking-wider mb-4 text-white group-hover:text-[#FF5733] transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 mb-6 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    {service.description}
                  </p>

                  {/* Includes */}
                  <div className="mb-6 p-4 bg-black/30 rounded border border-gray-800 group-hover:border-[#FF5733]/30 transition-colors duration-300">
                    <div className="flex items-center gap-2 mb-3">
                      <svg className="w-4 h-4 text-[#FF5733]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <p className="text-sm uppercase tracking-wider text-[#FF5733] font-semibold">
                        Includes:
                      </p>
                    </div>
                    <ul className="space-y-1">
                      {service.includes.map((item, idx) => (
                        <li key={idx} className="text-gray-400 text-sm flex items-start gap-2">
                          <span className="text-[#FF5733] mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Time */}
                  <div className="flex items-center gap-2 text-gray-400 bg-black/40 p-3 rounded border border-gray-800 group-hover:border-[#FF5733]/30 transition-colors duration-300">
                    <svg 
                      className="w-5 h-5 text-[#FF5733]" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                      />
                    </svg>
                    <span className="text-sm font-medium uppercase tracking-wide">
                      {service.time}
                    </span>
                  </div>

                  {/* Decorative Corner */}
                  <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-[#FF5733] opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-75 group-hover:scale-100"></div>
                  <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-[#FF5733] opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-75 group-hover:scale-100"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-linear-to-b from-black to-gray-900">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-wider mb-4 sm:mb-6 font-(family-name:--font-teko) px-4">
              Ready to Give Your Vehicle the <span className="text-[#FF5733]">Best Care</span>?
            </h2>
            <p className="text-gray-300 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed px-4">
              Choose from our range of professional services and let our expert team take care of your vehicle with precision and care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                <button
                  onClick={handleBooking}
                  className="group relative inline-block w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 bg-[#FF5733] text-white font-bold text-sm uppercase tracking-wider overflow-hidden transition-all duration-300 text-center cursor-pointer"
                >
                  <span className="relative z-10">Book Now</span>
                  <div className="absolute inset-0 bg-[#E64A2E] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                </button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                <Link
                  href="/plans"
                  className="group relative inline-block w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 border-2 border-white text-white font-bold text-sm uppercase tracking-wider overflow-hidden transition-all duration-300 text-center"
                >
                  <span className="relative z-10 group-hover:text-black transition-colors duration-300">View Plans</span>
                  <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 sm:py-20 bg-black">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <div className="border-l-4 border-[#FF5733] pl-4 inline-block mb-4 sm:mb-6">
              <p className="text-gray-300 uppercase tracking-wider text-xs sm:text-sm">Why Super Kleen</p>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-wider font-(family-name:--font-teko) px-4">
              Our <span className="text-[#FF5733]">Commitment</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -10 }}
              className="text-center p-6 sm:p-8 bg-gray-900/50 border border-gray-800 hover:border-[#FF5733] transition-all duration-500 group hover:shadow-xl hover:shadow-[#FF5733]/20"
            >
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="inline-block mb-4 text-[#FF5733]"
              >
                <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </motion.div>
              <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wider mb-3 text-white group-hover:text-[#FF5733] transition-colors duration-300">
                Quality Service
              </h3>
              <p className="text-sm sm:text-base text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                We use premium products and advanced techniques to ensure the best results for your vehicle.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -10 }}
              className="text-center p-6 sm:p-8 bg-gray-900/50 border border-gray-800 hover:border-[#FF5733] transition-all duration-500 group hover:shadow-xl hover:shadow-[#FF5733]/20"
            >
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="inline-block mb-4 text-[#FF5733]"
              >
                <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </motion.div>
              <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wider mb-3 text-white group-hover:text-[#FF5733] transition-colors duration-300">
                Fast & Efficient
              </h3>
              <p className="text-sm sm:text-base text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                Our experienced team delivers professional service without compromising on quality or speed.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -10 }}
              className="text-center p-6 sm:p-8 bg-gray-900/50 border border-gray-800 hover:border-[#FF5733] transition-all duration-500 group hover:shadow-xl hover:shadow-[#FF5733]/20"
            >
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="inline-block mb-4 text-[#FF5733]"
              >
                <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </motion.div>
              <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wider mb-3 text-white group-hover:text-[#FF5733] transition-colors duration-300">
                Customer Satisfaction
              </h3>
              <p className="text-sm sm:text-base text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                Your satisfaction is our priority. We go the extra mile to exceed your expectations.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
