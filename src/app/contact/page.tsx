export default function ContactPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative overflow-hidden">
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-teal-200 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 z-0 animate-blob"></div>

            <div className="text-center mb-16 relative z-10">
                <span className="inline-block py-1 px-3 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-semibold tracking-wider mb-4 shadow-sm">GET IN TOUCH</span>
                <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-blue-800 mb-6 tracking-tight drop-shadow-sm">Contact Us</h1>
                <p className="text-xl text-[lab(35_-16.57_-8.25)] max-w-2xl mx-auto font-medium">Have a question or need assistance? Reach out to us. We're always here to help.</p>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-teal-400 mx-auto rounded-full mt-8"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto relative z-10">
                <div className="group bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] border border-gray-100 hover:border-blue-100 hover:-translate-y-2 transition duration-500 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 rounded-2xl shadow-inner flex items-center justify-center mx-auto mb-6 text-2xl group-hover:scale-110 transition duration-500">📍</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 relative z-10">Our Location</h3>
                    <p className="text-[lab(35_-16.57_-8.25)] text-lg relative z-10">Purana Bazar, Bari</p>
                </div>

                <div className="group bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] border border-gray-100 hover:border-teal-100 hover:-translate-y-2 transition duration-500 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-teal-50 to-teal-100 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
                    <div className="w-16 h-16 bg-gradient-to-br from-teal-50 to-teal-100 text-teal-600 rounded-2xl shadow-inner flex items-center justify-center mx-auto mb-6 text-2xl group-hover:scale-110 transition duration-500">📞</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 relative z-10">Phone & WhatsApp</h3>
                    <p className="text-[lab(35_-16.57_-8.25)] text-lg relative z-10">+91-8302635500<br /><span className="text-sm font-medium mt-1 block text-gray-400">Mon-Sat: 10AM - 8PM</span></p>
                </div>

                <div className="group bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] border border-gray-100 hover:border-indigo-100 hover:-translate-y-2 transition duration-500 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-50 to-indigo-100 text-indigo-600 rounded-2xl shadow-inner flex items-center justify-center mx-auto mb-6 text-2xl group-hover:scale-110 transition duration-500">✉️</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 relative z-10">Email Us</h3>
                    <p className="text-[lab(35_-16.57_-8.25)] text-lg relative z-10 break-words">shrisaicomputersbari@gmail.com</p>
                </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-20 rounded-3xl overflow-hidden shadow-2xl border border-gray-100 h-[500px] bg-gray-50 relative w-full z-10 group">
                <div className="absolute inset-0 bg-blue-600/5 group-hover:bg-transparent transition duration-500 pointer-events-none z-20"></div>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3566.1081633635195!2d77.61251367521466!3d26.645019076807767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3973e1c92a614697%3A0x448672d55cf4be57!2sShri%20Sai%20Computers!5e0!3m2!1sen!2sin!4v1772187604902!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="filter grayscale-[20%] group-hover:grayscale-0 transition duration-500 relative z-10"
                ></iframe>
            </div>
        </div>
    );
}
