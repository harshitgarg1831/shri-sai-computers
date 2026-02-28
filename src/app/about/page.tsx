export default function AboutPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div>
                    <h1 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">About Shri Sai Computers</h1>
                    <p className="text-xl text-slate-600 mb-6 leading-relaxed">Founded in 2004, Shri Sai Computers has been providing premium computing solutions and expert repair services for over a decade. We believe in quality, transparency, and customer satisfaction.</p>
                    <p className="text-lg text-slate-600 mb-8 leading-relaxed">Our team consists of certified hardware technicians and software experts dedicated to solving your technical problems efficiently. Whether you need a high-end gaming rig or a simple screen replacement, we are your trusted local partner.</p>
                    <div className="grid grid-cols-2 gap-6 border-t pt-8">
                        <div>
                            <p className="text-4xl font-extrabold text-blue-600 mb-2">10k+</p>
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Happy Customers</p>
                        </div>
                        <div>
                            <p className="text-4xl font-extrabold text-blue-600 mb-2">20+</p>
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Years Experience</p>
                        </div>
                    </div>
                </div>
                <div className="relative">
                    <div className="absolute inset-0 bg-blue-600 rounded-3xl transform rotate-3 scale-105 opacity-10"></div>
                    <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Shri Sai Computers Team" className="rounded-3xl shadow-2xl relative z-10 w-full h-auto object-cover" />
                </div>
            </div>
        </div>
    );
}
