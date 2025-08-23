"use client";
import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
const NotFound: React.FC = () => {
  const router = useRouter();

  return (
    <div className=" min-h-[100dvh] bg-dark-2 relative  flex flex-col items-center justify-center p-4">
      {/* 404 Animated Graphic */}
      <div className="relative mb-8">
        <div className="flex items-center justify-center">
          <div className="text-[200px] font-bold text-main leading-none opacity-20 select-none">
            4
          </div>
          <div className="relative ">
            <div className="w-40 h-40 rounded-full bg-gradient-to-r from-dark-1 to-card flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-card"></div>
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 blur-xl w-32 h-32 rounded-full bg-dark-2 opacity-30"></div>
          </div>
          <div className="text-[200px] font-bold text-main leading-none opacity-20 select-none">
            4
          </div>
        </div>
      </div>

      <div className="max-w-lg w-full mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-main">
         Not Found
        </h1>
        <p className="text-lg text-text-text mb-8">The page you are looking for does not exist.</p>

        {/* Navigation Options */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-card to-dark-2 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <Home size={20} />
            <span>Back to Home</span>
          </Link>

          <button
            onClick={() => router.back()}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg shadow-sm hover:border-main hover:text-main transition-all duration-300"
          >
            <ArrowLeft size={20} />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
