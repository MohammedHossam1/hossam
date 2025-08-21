
import AuthDisplayInfo from "@/components/layout/auth/auth-display-info";
import type { Metadata } from "next";



export const metadata: Metadata = {
    title: "Next Starter",
    description: "next-starter",
    icons: {
        icon: "/favicon.ico",
    },
};


export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <main className="min-h-[calc(100vh-4rem)] ">
            <div className="grid grid-cols-1 md:grid-cols-2 container gap-2 py-10">
                <div className="">
                    {children}
                </div>
                <AuthDisplayInfo
                    title="Authentication"
                    icon=""
                    description="Enter your email and password to access your dashboard."
                />
            </div>

        </main>
    );
}
