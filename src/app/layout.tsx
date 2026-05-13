import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SessionProvider from '@/components/SessionProvider';
import { CartProvider } from '@/components/CartProvider';
import Chatbot from '@/components/Chatbot';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Shri Sai Computers - Retail Computer Shop',
  description: 'Your one-stop destination for Computers, Laptops, Accessories, and Expert Repair Services.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-white text-[lab(35_-16.57_-8.25)]`}>
        <SessionProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
            {/* <Chatbot /> */}
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
