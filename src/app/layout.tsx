import "./globals.css";

import Footer from "@/components/footer";
import SideBar from "@/components/layout/sidebar";
import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";
import { EllipsisVertical } from "lucide-react";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { HiMenu } from "react-icons/hi";
const poppins = Poppins({
  variable: "--font-almarai",
  subsets: ["latin"],
  weight: ["300", "400", "700", "800"],
});

export const metadata: Metadata = {
  title: "Next Starter",
  description: "next-starter",
  icons: {
    icon: "/favicon.ico",
  },
};

export default  function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html >
      <body
        className={`${poppins.className} antialiased min-h-screen flex max-lg:flex-col gap-2 items-center justify-center lg:custom-container `}
      >
        <div className="lg:hidden w-full flex items-center justify-between p-5 mt-3 bg-dark-2/70 ">
          <EllipsisVertical className="size-6" />
          <HiMenu className="size-6" />
        </div>
        <div className="relative flex  gap-3 xl:gap-7 h-[95vh] w-full rounded-2xl shadow-lg bg-dark-2/70">
          <div
            className="absolute top-0 left-0 right-0 h-100 bg-cover bg-center"
            style={{
              backgroundImage: "url('/as.jpg')",
              maskImage: "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))",
              WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))",
            }}
          >
            <div className="absolute inset-0 bg-dark-3/95 rounded-none"></div>

          </div>
          <div className="max-lg:hidden lg:w-[20%] relative z-10">
            <SideBar />
          </div>

          <div className="flex-1 overflow-auto hide-scrollbar ">
            <main className="max-lg:p-2">
              {children}
            </main>
            <Footer />
          </div>
          <div className="max-lg:hidden bg-dark-2 relative z-10">
            <Navbar />
          </div>

        </div>
        <Toaster />
      </body>

    </html>
  );
}



