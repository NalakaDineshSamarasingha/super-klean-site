'use client';

const categories = [
  { id: 'car', label: 'CAR SERVICES' },
  { id: 'maintenance', label: 'MAINTENANCE' },
  { id: 'repair', label: 'REPAIR' },
  { id: 'diagnostics', label: 'DIAGNOSTICS' },
];

export default function ServiceCategories() {
  return (
    <section className="bg-black py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Category Navigation */}
        <div className="relative">
          {/* Background Line */}
          <div className="absolute left-0 right-0 top-6 h-[2px] bg-gray-700"></div>
          
          {/* Active Progress Line */}
          <div 
            className="absolute left-0 top-6 h-[2px] bg-[#FF5733]"
            style={{ width: 'calc(25%)' }}
          ></div>

          {/* Category Items */}
          <div className="grid grid-cols-4 gap-2">
            {categories.map((category, index) => (
              <div
                key={category.id}
                className="flex flex-col items-center relative z-10"
              >
                {/* Square Box with Dot */}
                <div className="mb-4 bg-black px-2">
                  <div 
                    className={`w-10 h-10 border-2 flex items-center justify-center ${
                      index === 0
                        ? 'border-[#FF5733]' 
                        : 'border-gray-600'
                    }`}
                  >
                    <div 
                      className={`w-3 h-3 rounded-full ${
                        index === 0 ? 'bg-[#FF5733]' : 'bg-gray-600'
                      }`}
                    ></div>
                  </div>
                </div>

                {/* Label */}
                <span 
                  className={`text-xs sm:text-sm font-bold tracking-wider uppercase text-center ${
                    index === 0
                      ? 'text-[#FF5733]' 
                      : 'text-gray-500'
                  }`}
                >
                  {category.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
