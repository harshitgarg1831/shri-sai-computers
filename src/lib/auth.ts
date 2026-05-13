import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                mobile: { label: "Mobile No.", type: "text", placeholder: "Enter Mobile Number" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                await connectToDatabase();

                if (!credentials?.mobile || !credentials?.password) {
                    throw new Error("Please enter mobile number and password");
                }

                const user = await User.findOne({ mobile: credentials.mobile });

                if (!user) {
                    throw new Error("No user found with this mobile number");
                }

                const isPasswordMatch = await bcrypt.compare(credentials.password, user.password);

                if (!isPasswordMatch) {
                    throw new Error("Incorrect password");
                }

                return {
                    id: user._id.toString(),
                    name: user.name,
                    mobile: user.mobile,
                    role: user.role,
                    address: user.address
                } as any;
            }
        })
    ],
    callbacks: {
        async jwt({ token, user, account }) {
            if (user) {
                if (account?.provider === 'google') {
                    if (user.email === process.env.ADMIN_EMAIL?.trim()) {
                        token.role = 'admin';
                    } else {
                        token.role = 'user';
                    }
                } else {
                    token.role = (user as any).role || 'user';
                    token.mobile = (user as any).mobile;
                    token.id = user.id;
                }
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).role = token.role;
                (session.user as any).id = token.id;
                (session.user as any).mobile = token.mobile;
            }
            return session;
        },
        async signIn({ user, account }) {
            if (account?.provider === 'google') {
                const adminEmail = process.env.ADMIN_EMAIL?.trim();
                if (user.email === adminEmail) {
                    return true;
                }
                return false;
            }
            return true;
        }
    },
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
};
