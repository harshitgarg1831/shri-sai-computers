export default function ContactPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center mb-16">
                <h1 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">Contact Us</h1>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">Have a question or need assistance? Reach out to us. We're always here to help.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 text-center">
                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">📍</div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Our Location</h3>
                    <p className="text-slate-600">Purana Bazar, Bari</p>
                </div>
                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 text-center">
                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">📞</div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Phone & WhatsApp</h3>
                    <p className="text-slate-600">+91-8302635500<br />Mon-Sat: 10AM - 8PM</p>
                </div>
                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 text-center">
                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">✉️</div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Email Us</h3>
                    <p className="text-slate-600">shrisaicomputersbari@gmail.com</p>
                </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-20 rounded-3xl overflow-hidden shadow-sm border border-slate-100 h-96 bg-slate-200 relative w-full">
                <iframe
                    // src="https://maps.google.com/maps?q=Purana%20Bazar,%20Bari&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3566.1081633635195!2d77.61251367521466!3d26.645019076807767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3973e1c92a614697%3A0x448672d55cf4be57!2sShri%20Sai%20Computers!5e0!3m2!1sen!2sin!4v1772187604902!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </div>
    );
}
