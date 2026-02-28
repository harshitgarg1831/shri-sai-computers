import ProductEnquiryForm from '@/components/ProductEnquiryForm';
import connectToDatabase from '@/lib/db';
import Product from '@/models/Product';
import { notFound } from 'next/navigation';

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    await connectToDatabase();

    // We check if it's a valid mongoose object ID and find it
    let product;
    try {
        product = await Product.findById(id);
    } catch (e) {
        // invalid ID format
    }

    if (!product) {
        return notFound();
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="bg-gray-100 rounded-3xl overflow-hidden flex items-center justify-center p-8">
                    <img src={product.images?.[0] || 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} alt={product.name} className="w-full h-auto object-cover rounded-2xl shadow-lg mix-blend-multiply" />
                </div>
                <div className="flex flex-col justify-center">
                    <span className="text-sm font-bold text-blue-600 tracking-wider uppercase mb-2">
                        {product.brand || 'Unbranded'} • {product.category}
                    </span>
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-4 leading-tight">{product.name}</h1>
                    <p className="text-3xl font-black text-slate-900 mb-8">₹{product.price}</p>
                    <p className="text-slate-600 mb-8 text-lg leading-relaxed">{product.description}</p>

                    {product.specs && product.specs.length > 0 && (
                        <div className="mb-8">
                            <h3 className="font-bold text-slate-900 mb-4 text-lg">Key Specifications</h3>
                            <ul className="grid grid-cols-2 gap-3">
                                {product.specs.map((spec: string, i: number) => (
                                    <li key={i} className="flex items-center text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100 font-medium">
                                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span> {spec}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-8">
                        <h3 className="text-xl font-bold mb-6 text-slate-900 border-b border-slate-100 pb-4">Enquire About This Product</h3>
                        <ProductEnquiryForm productId={product._id.toString()} />
                    </div>
                </div>
            </div>
        </div>
    );
}
