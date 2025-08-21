// components/BentoGrid.tsx
"use client";
import { motion } from "framer-motion";
import { AVATAR_SRC } from "@/lib/images";
import { useSplash } from "./splash-provider";


export default function BentoGrid() {
    const { showSplash } = useSplash();


    return (
        <div className="mx-auto grid max-w-6xl grid-cols-12 gap-4 p-6">
            {/* كارت كبير */}
            <div className="col-span-12 md:col-span-7 rounded-2xl bg-neutral-900 p-6 min-h-48">
                <h2 className="text-xl font-semibold">لوحة معلومات</h2>
                <p className="mt-2 text-neutral-400">أي عناصر تحبها هنا…</p>
            </div>


            {/* الكارت الذي سيستقبل الصورة */}
            <div className="col-span-12 md:col-span-5 rounded-2xl bg-neutral-900 p-6 min-h-48 flex items-center gap-4">
                {/* نظهر الصورة فقط بعد اختفاء الـ Loader حتى يعمل shared layout الانتقال */}
                {!showSplash && (
                    <motion.img
                        src={AVATAR_SRC}
                        alt="avatar"
                        layoutId="obento-avatar"
                        className="h-28 w-28 object-cover rounded-2xl"
                        // تحكم إضافي في morph للـ borderRadius (اختياري)
                        transition={{ layout: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }}
                        // لو عايز تزود سلاسة زوايا أثناء الانتقال
                        style={{ borderRadius: 16 }}
                    />)
                }
                <div>
                    <h3 className="text-lg font-medium">الملف الشخصي</h3>
                    <p className="text-neutral-400">هنا مكان الصورة بعد التحميل (rounded-2xl).</p>
                </div>
            </div>


            {/* عناصر أخرى لتشكيل obento/bento layout */}
            <div className="col-span-12 sm:col-span-6 md:col-span-4 rounded-2xl bg-neutral-900 p-6 min-h-40" />
            <div className="col-span-12 sm:col-span-6 md:col-span-4 rounded-2xl bg-neutral-900 p-6 min-h-40" />
            <div className="col-span-12 md:col-span-4 rounded-2xl bg-neutral-900 p-6 min-h-40" />
        </div>
    );
}