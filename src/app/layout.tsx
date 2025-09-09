import "./globals.css";

import Footer from "@/components/footer";
import SideBar from "@/components/layout/sidebar";
import Navbar from "@/components/navbar";
import MobileNav from "@/components/navbar/mobile-nav";
import { Toaster } from "@/components/ui/sonner";
import ReactQueryProvider from "@/lib/reactquery-provider";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { Metadata } from "next";
import { Saira } from "next/font/google";
import Script from "next/script";


const saira = Saira({
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Mohammed Hossam | Frontend Developer",
  description:
    "Mohammed Hossam Fayyad - Frontend Developer متخصص في بناء مواقع ويب حديثة باستخدام React, Next.js, Tailwind CSS. استعرض أعمالي ومشاريعي الاحترافية.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Mohammed Hossam | Frontend Developer",
    description:
      "Frontend Developer متخصص في تطوير مواقع ويب حديثة باستخدام React, Next.js, Tailwind CSS. هنا تقدر تشوف المشاريع اللي اشتغلت عليها.",
    url: "https://mohammedhossam.site",
    siteName: "Mohammed Hossam Portfolio",
    images: [
      {
        url: "/preview.jpg",
        width: 1200,
        height: 630,
        alt: "Mohammed Hossam Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Hossam | Frontend Developer",
    description:
      "Frontend Developer متخصص في بناء مواقع ويب حديثة باستخدام React, Next.js, Tailwind CSS.",
    images: ["/preview.jpg"],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
        <head>
          <Script
            defer
            data-domain="mohammedhossam.site"
            src="https://plausible.io/js/script.js"
          />
        </head>
      <body
        className={`${saira.className}  antialiased min-h-screen flex max-lg:flex-col lg:gap-2 items-center justify-center lg:custom-container `}
      >
        <ReactQueryProvider>

          <MobileNav />
          <div className="relative flex  gap-3 xl:gap-7 lg:h-[95vh] w-full rounded-2xl shadow-lg bg-dark-2/70">
            <div
              className="absolute top-0 left-0 right-0 h-50 bg-cover bg-center"
              style={{
                backgroundImage: "url('/as.jpg')",
                maskImage: "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))",
                WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))",
              }}
            >
              <div className="absolute inset-0 bg-dark-3/95 rounded-none"></div>
            </div>
            <div className="max-lg:hidden lg:w-[20%] relative z-3">
              <SideBar />
            </div>
            <div className="flex-1 overflow-auto hide-scrollbar ">
              <main className="max-lg:p-2">
                {children}
              </main>
              <Footer />
            </div>
            <div className="max-lg:hidden bg-dark-2 relative ">
              <Navbar />
            </div>
          </div>
          <Toaster />
          <ReactQueryDevtools initialIsOpen={false} />

        </ReactQueryProvider>
      </body>

    </html>
  );
}



