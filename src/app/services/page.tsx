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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-20">
                <h1 className="text-5xl font-black text-[lab(35_-16.57_-8.25)]  mb-6 tracking-tight">Expert Repair Services</h1>
                <p className="text-xl text-[lab(35_-16.57_-8.25)] max-w-3xl mx-auto leading-relaxed">Fast, reliable, and professional repair services for your laptops and desktops. Our certified technicians can handle any issue.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                <div>
                    <h2 className="text-3xl font-extrabold text-[lab(35_-16.57_-8.25)] mb-8 border-b pb-4">What We Repair</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-500 transition cursor-pointer">
                            <div className="bg-blue-50 text-blue-600 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl mb-4">💻</div>
                            <h3 className="font-bold text-lg mb-2 text-[lab(35_-16.57_-8.25)]">Hardware Issues</h3>
                            <p className="text-[lab(35_-16.57_-8.25)] text-sm">Screen, keyboard, battery, and motherboard replacements.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-500 transition cursor-pointer">
                            <div className="bg-blue-50 text-blue-600 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl mb-4">⚙️</div>
                            <h3 className="font-bold text-lg mb-2 text-[lab(35_-16.57_-8.25)]">OS & Software</h3>
                            <p className="text-[lab(35_-16.57_-8.25)] text-sm">OS Installation, formatting, data recovery, and drivers.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-500 transition cursor-pointer">
                            <div className="bg-blue-50 text-blue-600 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl mb-4">🛡️</div>
                            <h3 className="font-bold text-lg mb-2 text-[lab(35_-16.57_-8.25)]">Virus Removal</h3>
                            <p className="text-[lab(35_-16.57_-8.25)] text-sm">Malware cleaning, antivirus setup, and system optimization.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-500 transition cursor-pointer">
                            <div className="bg-blue-50 text-blue-600 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl mb-4">🚀</div>
                            <h3 className="font-bold text-lg mb-2 text-[lab(35_-16.57_-8.25)]">Upgrades</h3>
                            <p className="text-[lab(35_-16.57_-8.25)] text-sm">RAM, SSD upgrades for faster and smoother performance.</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-bl-full opacity-10 blur-2xl"></div>
                    <h2 className="text-3xl font-extrabold text-[lab(35_-16.57_-8.25)] mb-8 relative z-10">Request a Repair</h2>

                    {status === 'success' && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg relative z-10 font-medium">
                            Your repair request has been submitted successfully! We will contact you soon.
                        </div>
                    )}
                    {status === 'error' && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg relative z-10 font-medium">
                            There was an error submitting your request. Please try again.
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-[lab(35_-16.57_-8.25)] mb-2">Name</label>
                                <input required name="name" value={formData.name} onChange={handleChange} type="text" className="w-full border border-slate-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none  text-[lab(35_-16.57_-8.25)]" placeholder="Name" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-[lab(35_-16.57_-8.25)] mb-2">Phone</label>
                                <input required name="phone" value={formData.phone} onChange={handleChange} type="tel" className="w-full border border-slate-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none  text-[lab(35_-16.57_-8.25)]" placeholder="Phone" />
                            </div>
                        </div>
                        {/* <div>
                            <label className="block text-sm font-semibold text-[lab(35_-16.57_-8.25)] mb-2">Device Type</label>
                            <select required name="deviceType" value={formData.deviceType} onChange={handleChange} className="w-full border border-slate-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none bg-white">
                                <option value="" disabled className='text-black-500'>Select your device</option>
                                <option value="Laptop">Laptop</option>
                                <option value="Desktop PC">Desktop PC</option>
                                <option value="Other">Other</option>
                            </select>
                        </div> */}
                        <div>
                            <label className="block text-sm font-semibold text-[lab(35_-16.57_-8.25)] mb-2">
                                Device Type
                            </label>

                            <select
                                required
                                name="deviceType"
                                value={formData.deviceType}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg shadow-sm p-3 
               bg-gray-50 text-[lab(35_-16.57_-8.25)]
               focus:ring-2 focus:ring-blue-500 
               focus:border-blue-500 
               hover:border-blue-400
               transition duration-200 outline-none"
                            >
                                <option value="" disabled className="text-[lab(35_-16.57_-8.25)]">
                                    Select your device
                                </option>
                                <option value="Laptop">Laptop</option>
                                <option value="Desktop PC">Desktop PC</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        {/* <div>
                            <label className="block text-sm font-semibold text-[lab(35_-16.57_-8.25)] mb-2">Describe the Issue</label>
                            <textarea required name="issueDescription" value={formData.issueDescription} onChange={handleChange} className="w-full border border-slate-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none" rows={5} placeholder="My laptop is not turning on..."></textarea>
                        </div> */}
                        <div>
                            <label className="block text-sm font-semibold text-[lab(35_-16.57_-8.25)] mb-2">
                                Describe the Issue
                            </label>

                            <textarea
                                required
                                name="issueDescription"
                                value={formData.issueDescription}
                                onChange={handleChange}
                                rows={5}
                                placeholder="My laptop is not turning on..."
                                className="w-full border border-gray-300 rounded-lg shadow-sm p-3 
               bg-gray-50 text-[lab(35_-16.57_-8.25)] 
               focus:ring-2 focus:ring-blue-500 
               focus:border-blue-500 
               hover:border-blue-400
               transition duration-200 outline-none"
                            ></textarea>
                        </div>
                        <button disabled={status === 'loading'} type="submit" className="w-full bg-blue-600 text-white font-bold py-4 rounded-lg hover:bg-blue-700 transition shadow-md shadow-blue-500/20 text-lg disabled:opacity-50">
                            {status === 'loading' ? 'Submitting...' : 'Submit Repair Request'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
