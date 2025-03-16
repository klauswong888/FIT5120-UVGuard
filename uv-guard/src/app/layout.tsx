import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import Providers from "./store/Providers";
import ReminderChecker from "@/app/components/ReminderChecker";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});


export const metadata: Metadata = {
  title: "UV Guard",
  description: "UV Guard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <html lang="en">
          <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
              <div className="flex flex-col h-screen py-4 px-2 md:py-4 md:px-16 gap-8">
                <header className="flex items-center justify-between">
                  <div className="flex items-center font-bold gap-8 text-2xl text-[#FF9D00]">
                    <Image src="/logo.svg" alt="Logo" width={80} height={80} />
                    <span>Your UV Guard</span>
                  </div>
                  <div className="flex nav items-center gap-8">
                    <Link href="/" className="flex items-center font-bold gap-4">
                      <span className="text-[#533C9F]">Home</span>
                      <svg className="w-3 h-3 text-[#533C9F] dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"/>
                      </svg>
                    </Link>
                    <Link href="/pages/reminder" className="flex items-center font-bold gap-4">
                      <span className="text-[#533C9F]">Set Reminder</span>
                      <svg className="w-3 h-3 text-[#533C9F] dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"/>
                      </svg>
                    </Link>
                    <Link href="/pages/impact" className="flex items-center font-bold gap-4">
                      <span className="text-[#533C9F]">UV Impact</span>
                      <svg className="w-3 h-3 text-[#533C9F] dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"/>
                      </svg>
                    </Link>
                    <Link href="/pages/products" className="flex items-center font-bold gap-4">
                      <span className="text-[#533C9F]">SunSafe Products</span>
                      <svg className="w-3 h-3 text-[#533C9F] dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"/>
                      </svg>
                    </Link>
                  </div>
                </header>
                <main className="flex-1 overflow-scroll">
                  <Providers>
                    <ReminderChecker /> 
                    {children}
                  </Providers>
                </main>
              </div>
          </body>
        </html>
  );
}
