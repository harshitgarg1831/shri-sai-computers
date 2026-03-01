"use client";
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-100 sticky top-0 z-50 transition-all duration-300 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20">
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0 flex items-center gap-3 group mr-4 sm:mr-8">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGKvuf0RkbWvDapGPXhzQJdJHrK02xU0VZwA&s" alt="Shri Sai Computers Logo" className="h-10 sm:h-12 w-auto rounded-lg object-contain shadow-sm group-hover:scale-105 transition-transform duration-300" />
                            <span className="font-extrabold text-lg sm:text-xl lg:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600 tracking-tight truncate max-w-[150px] sm:max-w-none">Shri Sai Computers</span>
                        </Link>
                        <div className="hidden lg:ml-8 lg:flex lg:space-x-8">
                            <Link href="/" className="border-transparent text-[lab(35_-16.57_-8.25)] hover:border-blue-600 hover:text-blue-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors">Home</Link>
                            <Link href="/products" className="border-transparent text-[lab(35_-16.57_-8.25)] hover:border-blue-600 hover:text-blue-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors">Products</Link>
                            <Link href="/services" className="border-transparent text-[lab(35_-16.57_-8.25)] hover:border-blue-600 hover:text-blue-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors">Services</Link>
                            <Link href="/about" className="border-transparent text-[lab(35_-16.57_-8.25)] hover:border-blue-600 hover:text-blue-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors">About</Link>
                            <Link href="/contact" className="border-transparent text-[lab(35_-16.57_-8.25)] hover:border-blue-600 hover:text-blue-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors">Contact</Link>
                        </div>
                    </div>
                    <div className="hidden lg:ml-6 lg:flex lg:items-center">
                        <Link href="/admin/login" className="px-4 py-2 rounded-xl text-sm font-semibold text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm">Admin</Link>
                    </div>
                    {/* Mobile menu button */}
                    <div className="flex items-center lg:hidden">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-xl text-gray-500 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors"
                            aria-expanded="false"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isMobileMenuOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu, show/hide based on menu state. */}
            {isMobileMenuOpen && (
                <div className="sm:hidden pb-3">
                    <div className="pt-2 pb-3 space-y-1">
                        <Link href="/" className="text-[lab(35_-16.57_-8.25)] hover:bg-blue-50 hover:text-blue-600 block pl-3 pr-4 py-2 border-l-4 border-transparent hover:border-blue-500 text-base font-medium" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                        <Link href="/products" className="text-[lab(35_-16.57_-8.25)] hover:bg-blue-50 hover:text-blue-600 block pl-3 pr-4 py-2 border-l-4 border-transparent hover:border-blue-500 text-base font-medium" onClick={() => setIsMobileMenuOpen(false)}>Products</Link>
                        <Link href="/services" className="text-[lab(35_-16.57_-8.25)] hover:bg-blue-50 hover:text-blue-600 block pl-3 pr-4 py-2 border-l-4 border-transparent hover:border-blue-500 text-base font-medium" onClick={() => setIsMobileMenuOpen(false)}>Services</Link>
                        <Link href="/about" className="text-[lab(35_-16.57_-8.25)] hover:bg-blue-50 hover:text-blue-600 block pl-3 pr-4 py-2 border-l-4 border-transparent hover:border-blue-500 text-base font-medium" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
                        <Link href="/contact" className="text-[lab(35_-16.57_-8.25)] hover:bg-blue-50 hover:text-blue-600 block pl-3 pr-4 py-2 border-l-4 border-transparent hover:border-blue-500 text-base font-medium" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
                    </div>
                    <div className="pt-4 pb-1 border-t border-gray-100">
                        <div className="space-y-1">
                            <Link href="/admin/login" className="block px-4 py-2 text-base font-medium text-[lab(35_-16.57_-8.25)] hover:text-blue-600 hover:bg-gray-50" onClick={() => setIsMobileMenuOpen(false)}>Admin Login</Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
