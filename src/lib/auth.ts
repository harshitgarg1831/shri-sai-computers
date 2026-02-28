import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
    ],
    callbacks: {
        async signIn({ user }) {
            // Trim to avoid whitespace issues
            const adminEmail = process.env.ADMIN_EMAIL?.trim();
            if (user.email === adminEmail) {
                return true;
            }
            return false; // Unauthorized for non-admin emails
        },
        async session({ session }) {
            const adminEmail = process.env.ADMIN_EMAIL?.trim();
            // If the session user does not perfectly match the admin email, return a null session
            if (session?.user?.email !== adminEmail) {
                return {} as any;
            }
            return session;
        },
    },
    pages: {
        signIn: '/admin/login',
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
};
