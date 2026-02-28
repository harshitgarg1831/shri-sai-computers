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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">All Products</h1>
                <ProductSearchFilter />
            </div>

            {products.length === 0 && (
                <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                    <div className="text-4xl mb-4">🔍</div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">No products found</h3>
                    <p className="text-slate-500">Try adjusting your search or category filter to find what you're looking for.</p>
                </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map(product => (
                    <Link href={`/products/${product._id}`} key={product._id} className="group">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition duration-300">
                            <div className="h-56 bg-gray-100 overflow-hidden relative">
                                <img src={product.images?.[0] || 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-blue-600">
                                    {product.category}
                                </div>
                            </div>
                            <div className="p-5">
                                <p className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-1">{product.brand || 'Unbranded'}</p>
                                <h3 className="font-bold text-slate-900 mb-2 truncate" title={product.name}>{product.name}</h3>
                                <div className="flex justify-between items-center mt-4">
                                    <p className="text-xl font-extrabold text-blue-600">₹{product.price}</p>
                                    <span className="text-sm font-medium text-slate-500 group-hover:text-blue-600 transition">View Details →</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
