"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useEffect } from "react";

export default function ProductSearchFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
    const [category, setCategory] = useState(searchParams.get("category") || "All Categories");

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            if (value && value !== "All Categories") {
                params.set(name, value);
            } else {
                params.delete(name);
            }
            return params.toString();
        },
        [searchParams]
    );

    // Debounced search
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            router.push(`/products?${createQueryString('q', searchQuery)}`);
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [searchQuery, createQueryString, router]);

    return (
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border border-gray-200 rounded-lg p-2 px-4 text-sm text-[lab(35_-16.57_-8.25)] bg-white w-full sm:w-64 focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
            <select
                value={category}
                onChange={(e) => {
                    const newCat = e.target.value;
                    setCategory(newCat);
                    router.push(`/products?${createQueryString('category', newCat)}`);
                }}
                className="border border-gray-200 rounded-lg p-2 px-4 text-sm text-[lab(35_-16.57_-8.25)] bg-white focus:ring-2 focus:ring-blue-500 outline-none transition cursor-pointer"
            >
                <option value="All Categories">All Categories</option>
                <option value="Laptops">Laptops</option>
                <option value="Desktops">Desktops</option>
                <option value="Accessories">Accessories</option>
                <option value="Printers">Printers</option>
                <option value="Speakers">Speakers</option>
                <option value="CCTV Cameras">CCTV Cameras</option>
            </select>
        </div>
    );
}
