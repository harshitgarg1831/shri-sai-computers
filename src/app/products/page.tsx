import Link from 'next/link';
import connectToDatabase from '@/lib/db';
import Product from '@/models/Product';
import ProductSearchFilter from '@/components/ProductSearchFilter';

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
    await connectToDatabase();

    // Process search parameters for filtering
    const params = await searchParams;
    const categoryQuery = params.category;
    const searchQuery = params.q;

    // Build the MongoDB query object
    const query: any = {};
    if (categoryQuery && categoryQuery !== 'All Categories') {
        query.category = categoryQuery;
    }
    if (searchQuery) {
        // Simple regex search on name or description (case-insensitive)
        query.$or = [
            { name: { $regex: searchQuery, $options: 'i' } },
            { description: { $regex: searchQuery, $options: 'i' } },
            { brand: { $regex: searchQuery, $options: 'i' } }
        ];
    }

    const products = await Product.find(query).sort({ createdAt: -1 });

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative overflow-hidden min-h-screen">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100 rounded-full mix-blend-multiply filter blur-[150px] opacity-40 -z-10 animate-blob"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-100 rounded-full mix-blend-multiply filter blur-[150px] opacity-40 -z-10 animate-blob animation-delay-2000"></div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 relative z-10">
                <div>
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold tracking-widest mb-3 shadow-sm uppercase">CATALOG</span>
                    <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-blue-800 tracking-tight drop-shadow-sm">All Products</h1>
                </div>
                <div className="w-full md:w-auto bg-white/80 backdrop-blur-md p-2 rounded-2xl shadow-sm border border-gray-100">
                    <ProductSearchFilter />
                </div>
            </div>

            {products.length === 0 && (
                <div className="text-center py-24 bg-white/60 backdrop-blur-sm rounded-3xl border border-dashed border-gray-300 shadow-sm relative z-10">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner text-4xl">🔍</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">No products found</h3>
                    <p className="text-[lab(35_-16.57_-8.25)] text-lg max-w-md mx-auto">Try adjusting your search or category filter to find what you're looking for.</p>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                {products.map(product => (
                    <Link href={`/products/${product._id}`} key={product._id} className="group h-full">
                        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:border-blue-100 transition duration-500 h-full flex flex-col hover:-translate-y-2 relative">
                            {/* Hover overlay glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none z-10"></div>

                            <div className="h-60 bg-gray-50 overflow-hidden relative border-b border-gray-50">
                                <img src={product.images?.[0] || 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-out" />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600 shadow-sm z-20">
                                    {product.category}
                                </div>
                            </div>
                            <div className="p-6 flex-grow flex flex-col justify-between relative z-20">
                                <div>
                                    <p className="text-xs font-bold text-gray-400 tracking-wider uppercase mb-2">{product.brand || 'Unbranded'}</p>
                                    <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 leading-snug group-hover:text-blue-600 transition duration-300" title={product.name}>{product.name}</h3>
                                </div>
                                <div className="flex justify-between items-end mt-6 pt-4 border-t border-gray-50">
                                    <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">₹{product.price}</p>
                                    <span className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition duration-300 shadow-sm">
                                        <svg className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
