import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <Link href="/" className="flex-shrink-0 flex items-center gap-2">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGKvuf0RkbWvDapGPXhzQJdJHrK02xU0VZwA&s" alt="Shri Sai Computers Logo" className="h-10 w-auto rounded-md object-contain" />
                            <span className="font-extrabold text-2xl text-blue-600 tracking-tight">Shri Sai Computers</span>
                        </Link>
                        <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
                            <Link href="/" className="border-transparent text-gray-500 hover:border-blue-600 hover:text-blue-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors">Home</Link>
                            <Link href="/products" className="border-transparent text-gray-500 hover:border-blue-600 hover:text-blue-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors">Products</Link>
                            <Link href="/services" className="border-transparent text-gray-500 hover:border-blue-600 hover:text-blue-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors">Services</Link>
                            <Link href="/about" className="border-transparent text-gray-500 hover:border-blue-600 hover:text-blue-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors">About</Link>
                            <Link href="/contact" className="border-transparent text-gray-500 hover:border-blue-600 hover:text-blue-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors">Contact</Link>
                        </div>
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:items-center">
                        <Link href="/admin/login" className="text-gray-400 hover:text-blue-600 text-sm font-medium transition-colors">Admin</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
