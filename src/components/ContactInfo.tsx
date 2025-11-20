import Image from 'next/image';
import Link from 'next/link';

export default function ContactInfo() {
  return (
    <section className="bg-black py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="flex flex-col gap-8">
            {/* Tagline */}
            <div className="flex items-center gap-4">
              <div className="w-1 h-6 bg-[#FF5733]"></div>
              <p className="text-gray-400 uppercase tracking-wider text-sm">
                KEEPING YOUR VEHICLE IN TOP CONDITION
              </p>
            </div>

            {/* Main Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight font-[family-name:var(--font-teko)] uppercase tracking-wide">
              TAILORED AUTOMOTIVE<br />
              SERVICES FOR EVERY<br />
              MAKE AND MODEL
            </h2>

            {/* Contact Grid */}
            <div className="grid grid-cols-2 gap-6 pt-4">
              {/* Phone */}
              <Link 
                href="tel:+18001234567"
                className="flex items-center gap-4 group"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 border-l-2 border-[#FF5733] flex items-center pl-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                </div>
                <span className="text-gray-300 group-hover:text-[#FF5733] transition-colors">
                  +1-800-123-4567
                </span>
              </Link>

              {/* Email */}
              <Link 
                href="mailto:carsy@gmail.com"
                className="flex items-center gap-4 group"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 border-l-2 border-[#FF5733] flex items-center pl-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <span className="text-gray-300 group-hover:text-[#FF5733] transition-colors">
                  CARSY@GMAIL.COM
                </span>
              </Link>

              {/* Telegram */}
              <Link 
                href="#"
                className="flex items-center gap-4 group"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 border-l-2 border-[#FF5733] flex items-center pl-3">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                    </svg>
                  </div>
                </div>
                <span className="text-gray-300 group-hover:text-[#FF5733] transition-colors">
                  TELEGRAM CHAT
                </span>
              </Link>

              {/* Location */}
              <Link 
                href="#"
                className="flex items-center gap-4 group"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 border-l-2 border-[#FF5733] flex items-center pl-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>
                <span className="text-gray-300 group-hover:text-[#FF5733] transition-colors">
                  OUR LOCATION
                </span>
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative h-[400px] lg:h-[500px]">
            <Image
              src="/bg.jpg"
              alt="Luxury vehicle"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
