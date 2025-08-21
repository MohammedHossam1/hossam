// components/SplashOverlay.tsx
"use client";
import { AnimatePresence, motion } from "framer-motion";
import { AVATAR_SRC } from "@/lib/images";


export default function SplashOverlay({ visible }: { visible: boolean }) {
    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    className="fixed inset-0 z-50 grid place-items-center bg-white"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                    {/* الصورة هنا لها نفس layoutId للصورة داخل الـ Bento */}
                    <motion.img
                        src={AVATAR_SRC}
                        alt="avatar"
                        layoutId="obento-avatar"
                        // نبدأ بدائرة
                        initial={{ borderRadius:  20 }}
                        // من الأفضل ترك Framer يسيطر على المقاس عبر shared layout
                        className="size-60 object-cover"
                        // ممكن تضيف blur خفيف لستايل
                        style={{ filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.5))" }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}