"use server";

import connectToDatabase from "@/lib/db";
import Product from "@/models/Product";
import Inquiry from "@/models/Inquiry";
import RepairRequest from "@/models/RepairRequest";
import { revalidatePath } from "next/cache";

export async function deleteProduct(id: string) {
    await connectToDatabase();
    await Product.findByIdAndDelete(id);
    revalidatePath("/admin/products");
    revalidatePath("/products");
}

export async function updateProductStock(id: string, currentStock: number, change: number) {
    await connectToDatabase();
    // Cannot drop below 0
    const newStock = Math.max(0, currentStock + change);
    await Product.findByIdAndUpdate(id, { stock: newStock });
    revalidatePath("/admin/products");
    revalidatePath("/products");
    revalidatePath(`/products/${id}`);
}

export async function addProduct(formData: FormData) {
    await connectToDatabase();

    const name = formData.get("name") as string;
    const brand = formData.get("brand") as string;
    const category = formData.get("category") as string;
    const price = Number(formData.get("price"));
    const stock = Number(formData.get("stock"));
    const description = formData.get("description") as string;
    const imageUrl = formData.get("image") as string;

    // Use a placeholder if they didn't provide a valid image URL
    const images = imageUrl && imageUrl.startsWith('http')
        ? [imageUrl]
        : ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"];

    await Product.create({
        name,
        brand: brand || 'Unbranded',
        category,
        price,
        stock,
        description,
        images
    });

    revalidatePath("/admin/products");
    revalidatePath("/products");
}

export async function deleteInquiry(id: string) {
    await connectToDatabase();
    await Inquiry.findByIdAndDelete(id);
    revalidatePath("/admin/inquiries");
}

export async function markInquiryContacted(id: string) {
    await connectToDatabase();
    await Inquiry.findByIdAndUpdate(id, { status: "Contacted" });
    revalidatePath("/admin/inquiries");
}

export async function deleteRepair(id: string) {
    await connectToDatabase();
    await RepairRequest.findByIdAndDelete(id);
    revalidatePath("/admin/repairs");
}

export async function updateRepairStatus(id: string, status: string) {
    await connectToDatabase();
    await RepairRequest.findByIdAndUpdate(id, { status });
    revalidatePath("/admin/repairs");
}
