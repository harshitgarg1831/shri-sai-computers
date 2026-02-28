"use client";
import { signIn } from "next-auth/react";

export default function LoginButton() {
    return (
        <button
            onClick={() => signIn("google", { callbackUrl: "/admin/dashboard" })}
            className="w-full bg-blue-600 text-white font-bold py-4 rounded-lg hover:bg-blue-700 transition flex items-center justify-center text-lg shadow-md shadow-blue-500/20"
        >
            <span className="bg-white text-blue-600 font-extrabold w-6 h-6 rounded-full flex items-center justify-center mr-3 text-sm">G</span>
            Sign in with Google
        </button>
    );
}
