'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface Plan {
  name: string;
  description: string;
  price: string;
  includes: string[];
  isPopular?: boolean;
  icon: ReactNode;
}

const plans: Plan[] = [
  {
    name: 'Basic Plan',
    description: 'Perfect for regular car maintenance.',
    price: 'Rs. 1,500',
    includes: [
      'Exterior wash',
      'Tire cleaning',
      'Quick dry'
    ],
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    name: 'Premium Plan',
    description: 'A balanced package with enhanced care.',
    price: 'Rs. 2,500',
    includes: [
      'Exterior wash',
      'Interior vacuum',
      'Dashboard cleaning',
      'Tire shine'
    ],
    isPopular: true,
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    )
  },
  {
    name: 'Gold Plan',
    description: 'Complete detailing for a showroom-level finish.',
    price: 'Rs. 5,000',
    includes: [
      'Full interior + exterior wash',
      'Wax + polish',
      'Engine bay cleaning'
    ],
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  }
];

export default function PlansPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-20">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 md:py-24 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 -top-48 -left-48 bg-[#FF5733] opacity-10 blur-[100px] rounded-full"></div>
          <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-[#FF5733] opacity-10 blur-[100px] rounded-full"></div>
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
            className="inline-block mb-6 px-4 py-2 bg-[#FF5733]/10 border border-[#FF5733]/30 rounded-full"
          >
            <span className="text-[#FF5733] text-sm font-semibold uppercase tracking-wider">Pricing Plans</span>
          </motion.div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-wider leading-tight uppercase font-(family-name:--font-teko) mb-6 sm:mb-8 px-4">
            OUR <span className="text-[#FF5733]">PLANS</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-400 leading-relaxed">
            Choose a package that suits your needs and experience premium car care
          </p>
        </motion.div>
      </section>

      {/* Plans Grid Section */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                {/* Popular Badge */}
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-[#FF5733] text-white px-4 py-1 rounded-full text-sm font-semibold tracking-wide">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                {/* Plan Card */}
                <div className={`relative h-full bg-linear-to-b from-gray-900 to-black border-2 rounded-2xl overflow-hidden transition-all duration-500 ${
                  plan.isPopular 
                    ? 'border-[#FF5733] shadow-lg shadow-[#FF5733]/20 scale-105' 
                    : 'border-gray-800 hover:border-[#FF5733] hover:shadow-xl hover:shadow-[#FF5733]/10 hover:scale-105'
                }`}>
                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Card Content */}
                  <div className="p-6 sm:p-8 relative z-10">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                      className="text-[#FF5733] mb-6 flex justify-center"
                    >
                      {plan.icon}
                    </motion.div>

                    {/* Plan Name */}
                    <h3 className="text-2xl sm:text-3xl font-bold text-center mb-3 font-[--font-teko] tracking-wide">
                      {plan.name}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 text-center mb-6 text-sm sm:text-base">
                      {plan.description}
                    </p>

                    {/* Price */}
                    <div className="text-center mb-8">
                      <div className="text-4xl sm:text-5xl font-bold text-[#FF5733] font-[--font-teko]">
                        {plan.price}
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="w-full h-px bg-linear-to-r from-transparent via-gray-700 to-transparent mb-6"></div>

                    {/* Includes Section */}
                    <div className="mb-8">
                      <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                        Includes:
                      </h4>
                      <ul className="space-y-3">
                        {plan.includes.map((item, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * idx }}
                            className="flex items-start gap-3"
                          >
                            <svg className="w-5 h-5 text-[#FF5733] shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-gray-300 text-sm sm:text-base">{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Book Now Button */}
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`relative w-full py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg tracking-wide transition-all duration-300 overflow-hidden group/btn ${
                        plan.isPopular
                          ? 'bg-[#FF5733] text-white hover:bg-[#E64A2E] shadow-lg shadow-[#FF5733]/30'
                          : 'bg-transparent border-2 border-[#FF5733] text-[#FF5733] hover:bg-[#FF5733] hover:text-white'
                      }`}
                    >
                      <span className="relative z-10">BOOK NOW</span>
                      <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Monthly Membership Section */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative bg-linear-to-br from-[#FF5733] to-[#E64A2E] rounded-3xl overflow-hidden p-8 sm:p-10 md:p-12 shadow-2xl shadow-[#FF5733]/30"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '40px 40px'
              }}></div>
            </div>

            {/* Animated Circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/20 rounded-full blur-2xl"></div>

            <div className="relative z-10 text-center">
              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-block mb-6"
              >
                <svg className="w-16 h-16 sm:w-20 sm:h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </motion.div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 font-[--font-teko] tracking-wide">
                Monthly Membership
              </h2>
              
              <p className="text-white/90 text-lg sm:text-xl mb-6 max-w-2xl mx-auto">
                Maintain your vehicle with monthly care
              </p>

              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 sm:p-8 mb-8 max-w-2xl mx-auto border border-white/30 shadow-xl">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-[--font-teko]">
                    SPECIAL OFFER
                  </h3>
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <p className="text-white text-lg sm:text-xl leading-relaxed">
                  Get <span className="font-bold text-2xl sm:text-3xl px-2 py-1 bg-white/20 rounded-lg">1 FREE</span> body wash for every{' '}
                  <span className="font-bold text-2xl sm:text-3xl px-2 py-1 bg-white/20 rounded-lg">5</span> washes
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="relative bg-white text-[#FF5733] px-8 sm:px-10 py-3 sm:py-4 rounded-xl font-bold text-lg sm:text-xl tracking-wide hover:bg-gray-100 transition-all duration-300 shadow-2xl group/join overflow-hidden"
              >
                <span className="relative z-10">JOIN NOW</span>
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-[#FF5733]/10 to-transparent -translate-x-full group-hover/join:translate-x-full transition-transform duration-700"></div>
              </motion.button>
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
              Not sure which plan to choose?
            </h2>
            <p className="text-gray-400 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
              Contact our team and we'll help you find the perfect plan for your vehicle
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent border-2 border-[#FF5733] text-[#FF5733] px-8 py-3 rounded-lg font-semibold text-lg hover:bg-[#FF5733] hover:text-white transition-all duration-300"
            >
              CONTACT US
            </motion.button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
