// components/SplashProvider.tsx
"use client";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { AVATAR_SRC } from "@/lib/images";
import SplashOverlay from "./overlay-provider";


interface Ctx {
    showSplash: boolean;
}


const SplashCtx = createContext<Ctx>({ showSplash: true });
export const useSplash = () => useContext(SplashCtx);


export default function SplashProvider({ children }: { children: React.ReactNode }) {
    const [showSplash, setShowSplash] = useState(true);


    // نحمّل الصورة مسبقًا وننتظر عليها
    useEffect(() => {
        let mounted = true;
        const img = new Image();
        img.src = AVATAR_SRC;
        // ننتظر onload + تأخير بسيط لجمال الحركة
        img.onload = () => {
            if (!mounted) return;
            // ندي المستخدِم إحساس تحميل وجيز
            setTimeout(() => setShowSplash(false), 700);
        };
        // fallback safety timeout لو onload اتأخرت
        const t = setTimeout(() => mounted && setShowSplash(false), 3000);
        return () => {
            mounted = false;
            clearTimeout(t);
        };
    }, []);


    const value = useMemo(() => ({ showSplash }), [showSplash]);


    return (
        <SplashCtx.Provider value={value}>
            {/* الـ Overlay موجود فقط أثناء التحميل */}
            <SplashOverlay visible={showSplash} />
            <div aria-hidden={showSplash}>
                {children}
            </div>
        </SplashCtx.Provider>
    );
}