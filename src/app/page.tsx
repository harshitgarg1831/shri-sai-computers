import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600 opacity-20 transform -skew-y-12"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Your Ultimate Tech Partner
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-[lab(35_-16.57_-8.25)] max-w-3xl mx-auto">
            Premium computers, laptops, accessories, and expert repair services you can trust.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products" className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-500 transition shadow-lg shadow-blue-500/30">
              Shop Now
            </Link>
            <Link href="/services" className="bg-slate-800 text-white px-8 py-4 rounded-full font-bold text-lg border border-slate-700 hover:bg-slate-700 transition shadow-lg">
              Book a Repair
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-[lab(35_-16.57_-8.25)] mb-16">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center border border-gray-100 hover:-translate-y-1 transition duration-300">
              <div className="w-16 h-16 mx-auto bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6 text-2xl">
                💻
              </div>
              <h3 className="text-xl font-bold mb-3 text-[lab(35_-16.57_-8.25)]">Premium Products</h3>
              <p className="text-[lab(35_-16.57_-8.25)]">Top-tier laptops, desktops, and accessories from leading brands.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center border border-gray-100 hover:-translate-y-1 transition duration-300">
              <div className="w-16 h-16 mx-auto bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6 text-2xl">
                🔧
              </div>
              <h3 className="text-xl font-bold mb-3 text-[lab(35_-16.57_-8.25)]">Expert Repairs</h3>
              <p className="text-[lab(35_-16.57_-8.25)]">Fast and reliable hardware and software repair services by certified technicians.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center border border-gray-100 hover:-translate-y-1 transition duration-300">
              <div className="w-16 h-16 mx-auto bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6 text-2xl">
                🎧
              </div>
              <h3 className="text-xl font-bold mb-3 text-[lab(35_-16.57_-8.25)]">24/7 Support</h3>
              <p className="text-[lab(35_-16.57_-8.25)]">Always here to help you with your technical inquiries and support needs.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
