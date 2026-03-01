"use client";

import { useState } from 'react';

export default function ServicesPage() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        deviceType: '',
        issueDescription: ''
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        try {
            const res = await fetch('/api/repairs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (data.success) {
                setStatus('success');
                setFormData({ name: '', phone: '', deviceType: '', issueDescription: '' });
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative overflow-hidden">
            <div className="absolute top-20 right-10 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob"></div>
            <div className="absolute bottom-10 left-10 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob animation-delay-4000"></div>

            <div className="text-center mb-20 relative z-10">
                <span className="inline-block py-1 px-3 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-semibold tracking-wider mb-4 shadow-sm">OUR EXPERTISE</span>
                <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-blue-800 mb-6 tracking-tight drop-shadow-sm">Expert Repair Services</h1>
                <p className="text-xl text-[lab(35_-16.57_-8.25)] max-w-3xl mx-auto leading-relaxed font-medium">Fast, reliable, and professional repair services for your laptops and desktops. Our certified technicians can handle any issue.</p>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-teal-400 mx-auto rounded-full mt-8"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start relative z-10">
                <div>
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-8 pb-4">What We Repair</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="group bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] border border-gray-100 hover:border-blue-100 transition duration-500 relative overflow-hidden cursor-pointer">
                            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
                            <div className="bg-gradient-to-br from-blue-100 w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-2xl mb-4 shadow-sm group-hover:scale-110 transition duration-500">💻</div>
                            <h3 className="font-bold text-xl mb-2 text-gray-900 relative z-10">Hardware Issues</h3>
                            <p className="text-[lab(35_-16.57_-8.25)] text-sm leading-relaxed relative z-10">Screen, keyboard, battery, and motherboard replacements.</p>
                        </div>
                        <div className="group bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] border border-gray-100 hover:border-teal-100 transition duration-500 relative overflow-hidden cursor-pointer">
                            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-teal-50 to-teal-100 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
                            <div className="bg-gradient-to-br from-teal-100 w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-2xl mb-4 shadow-sm group-hover:scale-110 transition duration-500">⚙️</div>
                            <h3 className="font-bold text-xl mb-2 text-gray-900 relative z-10">OS & Software</h3>
                            <p className="text-[lab(35_-16.57_-8.25)] text-sm leading-relaxed relative z-10">OS Installation, formatting, data recovery, and drivers.</p>
                        </div>
                        <div className="group bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] border border-gray-100 hover:border-indigo-100 transition duration-500 relative overflow-hidden cursor-pointer">
                            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
                            <div className="bg-gradient-to-br from-indigo-100 w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-2xl mb-4 shadow-sm group-hover:scale-110 transition duration-500">🛡️</div>
                            <h3 className="font-bold text-xl mb-2 text-gray-900 relative z-10">Virus Removal</h3>
                            <p className="text-[lab(35_-16.57_-8.25)] text-sm leading-relaxed relative z-10">Malware cleaning, antivirus setup, and system optimization.</p>
                        </div>
                        <div className="group bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] border border-gray-100 hover:border-blue-100 transition duration-500 relative overflow-hidden cursor-pointer">
                            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
                            <div className="bg-gradient-to-br from-blue-100 w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-2xl mb-4 shadow-sm group-hover:scale-110 transition duration-500">🚀</div>
                            <h3 className="font-bold text-xl mb-2 text-gray-900 relative z-10">Upgrades</h3>
                            <p className="text-[lab(35_-16.57_-8.25)] text-sm leading-relaxed relative z-10">RAM, SSD upgrades for faster and smoother performance.</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-10 mt-6 lg:mt-0 rounded-3xl border border-gray-100 shadow-[0_20px_50px_rgb(0,0,0,0.1)] relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition duration-700"></div>
                    <div className="absolute -top-16 -right-16 w-64 h-64 bg-teal-400 rounded-full mix-blend-multiply opacity-10 blur-[80px]"></div>
                    <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply opacity-10 blur-[80px]"></div>

                    <h2 className="text-3xl font-extrabold text-gray-900 mb-8 relative z-10">Request a Repair</h2>

                    {status === 'success' && (
                        <div className="mb-6 p-4 bg-green-50/80 backdrop-blur-sm border border-green-200 text-green-700 rounded-xl relative z-10 font-medium">
                            Your repair request has been submitted successfully! We will contact you soon.
                        </div>
                    )}
                    {status === 'error' && (
                        <div className="mb-6 p-4 bg-red-50/80 backdrop-blur-sm border border-red-200 text-red-700 rounded-xl relative z-10 font-medium">
                            There was an error submitting your request. Please try again.
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">Name</label>
                                <input required name="name" value={formData.name} onChange={handleChange} type="text" pattern="^[A-Za-z ]+$" title="Name should only contain letters and spaces" className="w-full border border-gray-200 rounded-xl shadow-sm p-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 outline-none hover:border-blue-300 bg-gray-50/50 text-gray-900 font-medium" placeholder="Your Name" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">Phone</label>
                                <input required name="phone" value={formData.phone} onChange={handleChange} type="tel" pattern="[0-9]{10}" minLength={10} maxLength={10} inputMode="numeric" title="Please enter exactly 10 digits for your mobile number" className="w-full border border-gray-200 rounded-xl shadow-sm p-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 outline-none hover:border-blue-300 bg-gray-50/50 text-gray-900 font-medium" placeholder="10-Digit Phone Number" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                Device Type
                            </label>
                            <select
                                required
                                name="deviceType"
                                value={formData.deviceType}
                                onChange={handleChange}
                                className="w-full border border-gray-200 rounded-xl shadow-sm p-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 outline-none hover:border-blue-300 bg-gray-50/50 text-gray-900 font-medium"
                            >
                                <option value="" disabled className="text-gray-400">
                                    Select your device
                                </option>
                                <option value="Laptop">Laptop</option>
                                <option value="Desktop PC">Desktop PC</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                Describe the Issue
                            </label>
                            <textarea
                                required
                                name="issueDescription"
                                value={formData.issueDescription}
                                onChange={handleChange}
                                rows={5}
                                placeholder="My laptop is not turning on..."
                                className="w-full border border-gray-200 rounded-xl shadow-sm p-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 outline-none hover:border-blue-300 bg-gray-50/50 text-gray-900 font-medium whitespace-pre-wrap"
                            ></textarea>
                        </div>
                        <button disabled={status === 'loading'} type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 rounded-xl hover:shadow-[0_10px_20px_rgba(37,99,235,0.3)] hover:-translate-y-1 transition duration-300 text-lg disabled:opacity-50 border border-blue-500/20">
                            {status === 'loading' ? 'Submitting...' : 'Submit Repair Request'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
