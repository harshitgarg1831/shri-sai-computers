"use client";

import { useState } from 'react';

export default function ProductEnquiryForm({ productId }: { productId: string }) {
    const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        try {
            const res = await fetch('/api/inquiries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, productId })
            });
            if (!res.ok) throw new Error('Failed to submit');
            setStatus('success');
            setFormData({ name: '', phone: '', message: '' });
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {status === 'success' && <div className="p-4 bg-green-50 text-green-700 rounded-lg">Enquiry sent successfully!</div>}
            {status === 'error' && <div className="p-4 bg-red-50 text-red-700 rounded-lg">Failed to send enquiry. Please try again.</div>}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                    <label className="block text-sm font-semibold text-[lab(35_-16.57_-8.25)] mb-2">Name</label>
                    <input required name="name" value={formData.name} onChange={handleChange} type="text" className="w-full border  text-[lab(35_-16.57_-8.25)] border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none" placeholder="Your Name" />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-[lab(35_-16.57_-8.25)] mb-2">Phone</label>
                    <input required name="phone" value={formData.phone} onChange={handleChange} type="tel" className="w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none  text-[lab(35_-16.57_-8.25)]" placeholder="Your Phone Number" />
                </div>
            </div>
            <div>
                <label className="block text-sm font-semibold text-[lab(35_-16.57_-8.25)] mb-2">Message</label>
                <textarea required name="message" value={formData.message} onChange={handleChange} className="w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none text-[lab(35_-16.57_-8.25)]" rows={4} placeholder="I am interested in buying..."></textarea>
            </div>
            <button disabled={status === 'loading'} type="submit" className="w-full bg-blue-600 text-white font-bold py-4 rounded-lg hover:bg-blue-700 transition shadow-md shadow-blue-500/20 text-lg disabled:opacity-50">
                {status === 'loading' ? 'Sending...' : 'Send Enquiry'}
            </button>
        </form>
    );
}
