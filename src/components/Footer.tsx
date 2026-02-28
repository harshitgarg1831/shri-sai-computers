export default function Footer() {
    return (
        <footer className="bg-gray-50 border-t border-gray-100 mt-auto">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <span className="text-xl font-bold text-blue-600">Shri Sai Computers</span>
                        <p className="text-sm text-gray-500 mt-1">Computers, Accessories, & Quality Repairs.</p>
                    </div>
                    <p className="text-center text-gray-400 text-sm">
                        &copy; {new Date().getFullYear()} Shri Sai Computers. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
