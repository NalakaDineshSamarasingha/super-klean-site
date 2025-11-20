'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, ReactNode } from 'react';

interface FAQ {
  question: string;
  answer: string | { text: string; list?: string[] };
  icon: ReactNode;
}

const faqs: FAQ[] = [
  {
    question: 'How do I make a booking?',
    answer: 'You can book online through our booking page or walk in anytime.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    question: 'Do you accept online payments?',
    answer: 'Online payment is coming soon. Currently, we accept cash and card at the venue.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    )
  },
  {
    question: 'How long does a car wash take?',
    answer: {
      text: '',
      list: [
        'Standard wash: 20–30 mins',
        'Full service: 45–60 mins',
        'Cut & Polish: 2–3 hours'
      ]
    },
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    question: 'Do I need an appointment?',
    answer: 'Walk-ins are welcome, but online booking guarantees faster service.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    )
  },
  {
    question: 'What vehicle types do you service?',
    answer: 'Cars, SUVs, vans, and small pickup trucks.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    question: 'Do you offer loyalty rewards?',
    answer: 'Yes — get 1 free body wash for every 5 washes',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  }
];

export default function FAQsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center pt-20">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/bg.jpg"
            alt="FAQs background"
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
            <p className="text-gray-300 uppercase tracking-wider text-xs sm:text-sm">Got Questions?</p>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-wider leading-tight uppercase font-(family-name:--font-teko) mb-4 sm:mb-6 px-4"
          >
            FREQUENTLY ASKED <span className="text-[#FF5733]">QUESTIONS</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-400 leading-relaxed"
          >
            Find answers to the most common questions about our services
          </motion.p>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div
                  className={`bg-linear-to-br from-gray-900 to-black border-2 transition-all duration-300 rounded-lg overflow-hidden ${
                    openIndex === index 
                      ? 'border-[#FF5733] shadow-lg shadow-[#FF5733]/20' 
                      : 'border-gray-800 hover:border-gray-700'
                  }`}
                >
                  {/* Question Button */}
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 group"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      {/* Icon */}
                      <div 
                        className={`shrink-0 p-3 rounded-lg transition-all duration-300 ${
                          openIndex === index 
                            ? 'bg-[#FF5733] text-white' 
                            : 'bg-[#FF5733]/10 text-[#FF5733] group-hover:bg-[#FF5733]/20'
                        }`}
                      >
                        {faq.icon}
                      </div>
                      
                      {/* Question Text */}
                      <h3 
                        className={`text-base sm:text-lg md:text-xl font-bold uppercase tracking-wide transition-colors duration-300 ${
                          openIndex === index 
                            ? 'text-[#FF5733]' 
                            : 'text-white group-hover:text-gray-200'
                        }`}
                      >
                        {faq.question}
                      </h3>
                    </div>

                    {/* Toggle Icon */}
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="shrink-0"
                    >
                      <svg 
                        className={`w-6 h-6 transition-colors duration-300 ${
                          openIndex === index ? 'text-[#FF5733]' : 'text-gray-400'
                        }`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </motion.div>
                  </button>

                  {/* Answer */}
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="px-5 sm:px-6 pb-5 sm:pb-6 pl-16 sm:pl-20">
                          <div className="border-l-2 border-[#FF5733]/30 pl-4 sm:pl-6">
                            {typeof faq.answer === 'string' ? (
                              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                                {faq.answer}
                              </p>
                            ) : (
                              <div className="space-y-3">
                                {faq.answer.text && (
                                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                                    {faq.answer.text}
                                  </p>
                                )}
                                {faq.answer.list && (
                                  <ul className="space-y-2">
                                    {faq.answer.list.map((item, idx) => (
                                      <li 
                                        key={idx} 
                                        className="text-gray-300 text-sm sm:text-base flex items-start gap-3"
                                      >
                                        <span className="text-[#FF5733] mt-1 shrink-0">•</span>
                                        <span>{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions Section */}
      <section className="py-16 sm:py-20 bg-linear-to-b from-black to-gray-900">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-3xl mx-auto text-center">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <div className="bg-[#FF5733]/10 p-6 rounded-full">
                <svg className="w-12 h-12 sm:w-16 sm:h-16 text-[#FF5733]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-wider mb-4 sm:mb-6 font-(family-name:--font-teko)">
              Still Have <span className="text-[#FF5733]">Questions</span>?
            </h2>
            <p className="text-gray-300 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed">
              Can't find the answer you're looking for? Our friendly team is here to help you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center justify-center px-8 sm:px-10 py-3 sm:py-4 bg-[#FF5733] text-white font-bold text-sm uppercase tracking-wider overflow-hidden transition-all duration-300 text-center rounded-lg"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Contact Us
                  </span>
                  <div className="absolute inset-0 bg-[#E64A2E] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a
                  href="tel:077xxxxxxx"
                  className="group relative inline-flex items-center justify-center px-8 sm:px-10 py-3 sm:py-4 border-2 border-white text-white font-bold text-sm uppercase tracking-wider overflow-hidden transition-all duration-300 text-center rounded-lg"
                >
                  <span className="relative z-10 group-hover:text-black transition-colors duration-300 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call Now
                  </span>
                  <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Quick Tips Section */}
      <section className="py-16 sm:py-20 bg-black">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="border-l-4 border-[#FF5733] pl-4 inline-block mb-4 sm:mb-6">
              <p className="text-gray-300 uppercase tracking-wider text-xs sm:text-sm">Helpful Information</p>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-wider font-(family-name:--font-teko)">
              Quick <span className="text-[#FF5733]">Tips</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -5 }}
              className="text-center p-6 sm:p-8 bg-gray-900/50 border border-gray-800 hover:border-[#FF5733] transition-all duration-500 group rounded-lg"
            >
              <div className="bg-[#FF5733]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#FF5733]/20 transition-colors duration-300">
                <svg className="w-8 h-8 text-[#FF5733]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wider mb-3 text-white group-hover:text-[#FF5733] transition-colors duration-300">
                Best Time to Visit
              </h3>
              <p className="text-sm sm:text-base text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                Weekday mornings (8-10 AM) are typically less busy for faster service
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -5 }}
              className="text-center p-6 sm:p-8 bg-gray-900/50 border border-gray-800 hover:border-[#FF5733] transition-all duration-500 group rounded-lg"
            >
              <div className="bg-[#FF5733]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#FF5733]/20 transition-colors duration-300">
                <svg className="w-8 h-8 text-[#FF5733]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wider mb-3 text-white group-hover:text-[#FF5733] transition-colors duration-300">
                What to Bring
              </h3>
              <p className="text-sm sm:text-base text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                Just bring your vehicle! We provide all cleaning materials and equipment
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -5 }}
              className="text-center p-6 sm:p-8 bg-gray-900/50 border border-gray-800 hover:border-[#FF5733] transition-all duration-500 group rounded-lg"
            >
              <div className="bg-[#FF5733]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#FF5733]/20 transition-colors duration-300">
                <svg className="w-8 h-8 text-[#FF5733]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wider mb-3 text-white group-hover:text-[#FF5733] transition-colors duration-300">
                Loyalty Program
              </h3>
              <p className="text-sm sm:text-base text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                Earn rewards with every visit! Ask about our loyalty card at reception
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
