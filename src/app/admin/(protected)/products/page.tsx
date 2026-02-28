import connectToDatabase from "@/lib/db";
import Product from "@/models/Product";
import { deleteProduct, addProduct, updateProductStock } from "../actions";

export default async function AdminProducts() {
    await connectToDatabase();
    const products = await Product.find({}).sort({ createdAt: -1 });

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-extrabold text-slate-900">Products</h1>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-12 p-8">
                <h2 className="text-xl font-bold mb-4">Add New Product</h2>
                <form action={addProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 ">
                    <input name="name" required placeholder="Product Name" className="border p-3 rounded" />
                    <input name="brand" required placeholder="Brand (e.g., Apple, Dell, Lenovo)" className="border p-3 rounded" />
                    <select name="category" required className="border p-3 rounded bg-white" defaultValue="Laptops">
                        <option value="Laptops">Laptops</option>
                        <option value="Desktops">Desktops</option>
                        <option value="Accessories">Accessories</option>
                        <option value="Printers">Printers</option>
                        <option value="Speakers">Speakers</option>
                        <option value="CCTV Cameras">CCTV Cameras</option>
                    </select>
                    <input name="price" type="number" required placeholder="Price" className="border p-3 rounded" />
                    <input name="stock" type="number" required placeholder="Stock Quantity" className="border p-3 rounded" />
                    <input name="image" type="url" placeholder="Image URL (e.g. https://images.unsplash.com/...)" className="border p-3 rounded md:col-span-2" />
                    <textarea name="description" required placeholder="Product Description" className="border p-3 rounded md:col-span-2" rows={3}></textarea>
                    <button type="submit" className="bg-blue-600 text-white px-4 py-3 rounded-lg font-bold hover:bg-blue-700 transition md:col-span-2">
                        Add Product
                    </button>
                </form>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-medium">
                        <tr>
                            <th className="p-4">Name</th>
                            <th className="p-4">Brand</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">Price</th>
                            <th className="p-4">Stock</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="p-8 text-center text-slate-500">No products found. Add your first product.</td>
                            </tr>
                        ) : (
                            products.map((product: any) => (
                                <tr key={product._id} className="border-b border-slate-50 hover:bg-slate-50">
                                    <td className="p-4 font-semibold text-slate-900">{product.name}</td>
                                    <td className="p-4 text-slate-600">{product.brand || 'Unbranded'}</td>
                                    <td className="p-4 text-slate-600">{product.category}</td>
                                    <td className="p-4 text-slate-600">₹{product.price}</td>
                                    <td className="p-4 text-slate-600">
                                        <div className="flex items-center space-x-2">
                                            <form action={updateProductStock.bind(null, product._id.toString(), product.stock, -1)}>
                                                <button type="submit" disabled={product.stock <= 0} className="w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold text-slate-600 disabled:opacity-50">-</button>
                                            </form>
                                            <span className="w-8 text-center font-medium">{product.stock}</span>
                                            <form action={updateProductStock.bind(null, product._id.toString(), product.stock, 1)}>
                                                <button type="submit" className="w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold text-slate-600">+</button>
                                            </form>
                                        </div>
                                    </td>
                                    <td className="p-4 text-right space-x-2 flex justify-end items-center h-full min-h-[64px]">
                                        <form action={deleteProduct.bind(null, product._id.toString())}>
                                            <button type="submit" className="text-red-500 hover:text-red-700 font-medium text-sm">Delete</button>
                                        </form>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
