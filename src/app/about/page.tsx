import CountUp from '@/components/CountUp';

export default function AboutPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 -z-10 animate-blob"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-300 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 -z-10 animate-blob animation-delay-2000"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div className="space-y-8 relative z-10">
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-semibold tracking-wider shadow-sm">OUR STORY</span>
                    <h1 className="text-5xl lg:text-6xl font-black text-[lab(35_-16.57_-8.25)] tracking-tight leading-tight drop-shadow-sm">About <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">Shri Sai Computers</span></h1>
                    <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full"></div>
                    <p className="text-xl text-[lab(35_-16.57_-8.25)] leading-relaxed font-medium">Founded in 2004, Shri Sai Computers has been providing premium computing solutions and expert repair services for over a decade. We believe in quality, transparency, and customer satisfaction.</p>
                    <p className="text-lg text-[lab(35_-16.57_-8.25)] leading-relaxed">Our team consists of certified hardware technicians and software experts dedicated to solving your technical problems efficiently. Whether you need a high-end gaming rig or a simple screen replacement, we are your trusted local partner.</p>

                    <div className="grid grid-cols-2 gap-8 pt-8 mt-8 border-t border-gray-100">
                        <div className="group bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] border border-gray-50 hover:border-blue-100 hover:-translate-y-2 transition duration-300 relative overflow-hidden">
                            <div className="absolute -top-4 -right-4 w-16 h-16 bg-blue-50 rounded-full opacity-0 group-hover:opacity-100 transition duration-500"></div>
                            <p className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-teal-400 mb-2 group-hover:scale-105 origin-left transition duration-300 relative z-10"><CountUp end={10} suffix="k+" duration={2500} /></p>
                            <p className="text-sm font-bold text-[lab(35_-16.57_-8.25)] uppercase tracking-widest relative z-10">Happy Customers</p>
                        </div>
                        <div className="group bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] border border-gray-50 hover:border-teal-100 hover:-translate-y-2 transition duration-300 relative overflow-hidden">
                            <div className="absolute -top-4 -right-4 w-16 h-16 bg-teal-50 rounded-full opacity-0 group-hover:opacity-100 transition duration-500"></div>
                            <p className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-teal-400 to-blue-600 mb-2 group-hover:scale-105 origin-left transition duration-300 relative z-10"><CountUp end={20} suffix="+" duration={2000} /></p>
                            <p className="text-sm font-bold text-[lab(35_-16.57_-8.25)] uppercase tracking-widest relative z-10">Years Exp.</p>
                        </div>
                    </div>
                </div>
                <div className="relative group perspective pt-10">
                    <div className="absolute inset-x-0 top-10 bottom-0 bg-gradient-to-tr from-blue-600 to-teal-400 rounded-3xl transform rotate-3 scale-105 opacity-20 group-hover:rotate-6 group-hover:scale-105 group-hover:opacity-30 transition duration-500"></div>
                    <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Shri Sai Computers Team" className="rounded-3xl shadow-[0_20px_50px_rgb(0,0,0,0.1)] relative z-10 w-full h-auto object-cover transform group-hover:-translate-y-3 transition duration-500" />
                </div>
            </div>
        </div>
    );
}
