"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function LocationPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const checkOpenStatus = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      
      // Business hours: 8:00 AM (8) to 6:00 PM (18)
      const openingHour = 8;
      const closingHour = 18;
      
      // Check if current time is within business hours
      const isCurrentlyOpen = hours >= openingHour && hours < closingHour;
      setIsOpen(isCurrentlyOpen);
      
      // Format current time for display
      const formattedTime = now.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
      setCurrentTime(formattedTime);
    };

    // Check immediately
    checkOpenStatus();
    
    // Update every minute
    const interval = setInterval(checkOpenStatus, 60000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center pt-20">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/bg.jpg"
            alt="Location background"
            fill
            className="object-cover opacity-30"
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
          className="relative z-10 container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="border-l-4 border-[#FF5733] pl-4 inline-block mb-4 sm:mb-6"
          >
            <p className="text-gray-300 uppercase tracking-wider text-xs sm:text-sm">
              Find Us Easily
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-wider leading-tight uppercase font-(family-name:--font-teko) mb-4 sm:mb-6 px-4"
          >
            VISIT <span className="text-[#FF5733]">SUPER KLEAN</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-400 leading-relaxed"
          >
            We are conveniently located and easy to find
          </motion.p>
        </motion.div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 lg:py-24">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Side - Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Address Card */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-linear-to-br from-gray-900 to-black border border-gray-800 hover:border-[#FF5733] transition-all duration-500 p-6 sm:p-8 rounded-lg group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-linear-to-br from-[#FF5733]/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                <div className="relative z-10">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="bg-[#FF5733]/10 p-3 rounded-lg group-hover:bg-[#FF5733]/20 transition-colors duration-300">
                      <svg
                        className="w-6 h-6 text-[#FF5733]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-white mb-2 group-hover:text-[#FF5733] transition-colors duration-300">
                        Address
                      </h3>
                      <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                        Super Klean Car Wash
                        <br />
                        <span className="text-gray-400">
                          4 Pirivena Rd, Dehiwala-Mount Lavinia 10350
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Opening Hours Card */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-linear-to-br from-gray-900 to-black border border-gray-800 hover:border-[#FF5733] transition-all duration-500 p-6 sm:p-8 rounded-lg group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-linear-to-br from-[#FF5733]/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                <div className="relative z-10">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="bg-[#FF5733]/10 p-3 rounded-lg group-hover:bg-[#FF5733]/20 transition-colors duration-300">
                      <svg
                        className="w-6 h-6 text-[#FF5733]"
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
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-white mb-3 group-hover:text-[#FF5733] transition-colors duration-300">
                        Opening Hours
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm sm:text-base">
                          <span className="text-gray-300">Monday – Sunday</span>
                          <span className="text-[#FF5733] font-semibold">
                            8:00 AM – 6:00 PM
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-700/50">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <p className="text-xs sm:text-sm text-gray-400 flex items-center">
                            <span 
                              className={`inline-block w-2 h-2 rounded-full mr-2 ${
                                isOpen 
                                  ? 'bg-green-500 animate-pulse' 
                                  : 'bg-red-500'
                              }`}
                            ></span>
                            {isOpen ? 'Open Now' : 'Closed Now'}
                          </p>
                          {currentTime && (
                            <p className="text-xs text-gray-500">
                              Current time: {currentTime}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Contact Card */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-linear-to-br from-gray-900 to-black border border-gray-800 hover:border-[#FF5733] transition-all duration-500 p-6 sm:p-8 rounded-lg group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-linear-to-br from-[#FF5733]/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                <div className="relative z-10">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="bg-[#FF5733]/10 p-3 rounded-lg group-hover:bg-[#FF5733]/20 transition-colors duration-300">
                      <svg
                        className="w-6 h-6 text-[#FF5733]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-white mb-3 group-hover:text-[#FF5733] transition-colors duration-300">
                        Contact
                      </h3>
                      <a
                        href="tel:077xxxxxxx"
                        className="text-gray-300 hover:text-[#FF5733] transition-colors text-base sm:text-lg font-medium inline-flex items-center gap-2"
                      >
                        <span>0112-733-793</span>
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="pt-4"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center justify-center w-full px-8 py-4 bg-[#FF5733] text-white font-bold text-sm uppercase tracking-wider overflow-hidden transition-all duration-300 text-center rounded-lg"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                        />
                      </svg>
                      Get Directions
                    </span>
                    <div className="absolute inset-0 bg-[#E64A2E] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right Side - Map */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="sticky top-24">
                <div className="relative overflow-hidden rounded-lg border-2 border-gray-800 hover:border-[#FF5733] transition-all duration-500 group">
                  {/* Map Container */}
                  <div className="aspect-4/3 lg:aspect-3/4 bg-gray-900 relative">
                    {/* Placeholder for Google Map - Replace with actual embed */}
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.534966573603!2d79.86782062454058!3d6.826269219571845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25be96f908661%3A0xfaa8c7df58a978b6!2sSuper%20Kleen%20Car%20service%20and%20wash!5e0!3m2!1sen!2slk!4v1763497705937!5m2!1sen!2slk"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="absolute inset-0 grayscale hover:grayscale-0 transition-all duration-500"
                    ></iframe>

                    {/* Overlay badge */}
                    <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-[#FF5733]/50">
                      <p className="text-xs uppercase tracking-wider text-[#FF5733] font-semibold">
                        Find Us Here
                      </p>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mt-6 p-6 bg-gray-900/50 border border-gray-800 rounded-lg"
                >
                  <h4 className="text-lg font-bold uppercase tracking-wider text-white mb-3 flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-[#FF5733]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Quick Info
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li className="flex items-start gap-2">
                      <span className="text-[#FF5733] mt-1">•</span>
                      <span>Free parking available on-site</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FF5733] mt-1">•</span>
                      <span>Waiting lounge with Wi-Fi</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FF5733] mt-1">•</span>
                      <span>Walk-ins welcome, bookings preferred</span>
                    </li>
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-16 sm:py-20 bg-linear-to-b from-black to-gray-900">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-wider mb-4 sm:mb-6 font-(family-name:--font-teko)">
            Ready to <span className="text-[#FF5733]">Visit Us</span>?
          </h2>
          <p className="text-gray-300 text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto">
            Book your appointment today or simply drop by during our opening
            hours
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/contact"
                className="group relative inline-block px-8 sm:px-10 py-3 sm:py-4 bg-[#FF5733] text-white font-bold text-sm uppercase tracking-wider overflow-hidden transition-all duration-300 text-center rounded-lg"
              >
                <span className="relative z-10">Book Appointment</span>
                <div className="absolute inset-0 bg-[#E64A2E] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/services"
                className="group relative inline-block px-8 sm:px-10 py-3 sm:py-4 border-2 border-white text-white font-bold text-sm uppercase tracking-wider overflow-hidden transition-all duration-300 text-center rounded-lg"
              >
                <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                  View Services
                </span>
                <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
