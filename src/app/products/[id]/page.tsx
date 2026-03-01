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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative overflow-hidden min-h-screen">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100 rounded-full mix-blend-multiply filter blur-[150px] opacity-40 -z-10 animate-blob"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-100 rounded-full mix-blend-multiply filter blur-[150px] opacity-40 -z-10 animate-blob animation-delay-2000"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
                <div className="bg-white/80 backdrop-blur-sm rounded-[3rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex items-center justify-center p-12 border border-gray-100 relative group min-h-[500px]">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition duration-700 pointer-events-none"></div>
                    <img src={product.images?.[0] || 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} alt={product.name} className="w-full h-auto object-contain rounded-2xl group-hover:scale-105 transition duration-700 ease-out z-10 drop-shadow-2xl" />
                </div>

                <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="inline-block py-1 px-3 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold tracking-widest shadow-sm uppercase">{product.brand || 'Unbranded'}</span>
                        <span className="inline-block py-1 px-3 rounded-full bg-teal-50 border border-teal-100 text-teal-600 text-xs font-bold tracking-widest shadow-sm uppercase">{product.category}</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight tracking-tight">{product.name}</h1>
                    <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500 mb-8 inline-block drop-shadow-sm">₹{product.price}</p>
                    <p className="text-[lab(35_-16.57_-8.25)] mb-10 text-lg leading-relaxed font-medium">{product.description}</p>

                    {product.specs && product.specs.length > 0 && (
                        <div className="mb-12">
                            <h3 className="font-bold text-gray-900 mb-6 text-xl border-b border-gray-100 pb-3">Key Specifications</h3>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {product.specs.map((spec: string, i: number) => (
                                    <li key={i} className="flex items-center text-gray-700 bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-gray-100 shadow-sm font-medium hover:border-blue-200 hover:shadow-md transition duration-300">
                                        <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mr-4 flex-shrink-0 shadow-sm">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                        </div>
                                        {spec}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="bg-white/80 backdrop-blur-md border border-gray-100 shadow-[0_20px_50px_rgb(0,0,0,0.06)] rounded-[2rem] p-8 md:p-10 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-700 pointer-events-none z-10"></div>
                        <h3 className="text-2xl font-black mb-8 text-gray-900 border-b border-gray-100 pb-4 relative z-20">Enquire About This Product</h3>
                        <div className="relative z-20">
                            <ProductEnquiryForm productId={product._id.toString()} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
