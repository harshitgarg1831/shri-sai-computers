"use client";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
    return (
        <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full bg-slate-800 text-[lab(35_-16.57_-8.25)] font-bold py-3 rounded-lg hover:bg-red-600 hover:text-white transition"
        >
            Sign Out
        </button>
    );
}
