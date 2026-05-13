"use client";
import { useCart } from "@/components/CartProvider";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AddToCartButton({ product }: { product: any }) {
    const { addToCart } = useCart();
    const { data: session } = useSession();
    const router = useRouter();

    const handleAdd = (e: React.MouseEvent) => {
        e.preventDefault(); // prevent triggering the parent Link

        if (!session) {
            alert("Please login first to add products to the cart.");
            router.push("/login");
            return;
        }

        addToCart({
            productId: product._id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.images?.[0] || 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
        });
    };

    return (
        <button
            onClick={handleAdd}
            className="grow ml-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-sm transition duration-300 z-30 relative"
        >
            Add to Cart
        </button>
    );
}
