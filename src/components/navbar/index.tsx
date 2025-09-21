'use client';
import { useNavbarStore } from "@/store";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

const NAV_ITEMS = [
    { label: "Home", href: "/" },
    { label: "projects", href: "/projects" },
    { label: "videos", href: "/videos" },
    { label: "Contact", href: "/contact" },
];

const Navbar = () => {
    const { isOpen, toggle, close } = useNavbarStore();
    const [isMoreThanLG, setIsMoreThanLG] = useState(false);

    const pathname = usePathname();

    const activeIndex = NAV_ITEMS.findIndex((item) => item.href === pathname);

    // Variants for the parent ul
    const listVariants = {
        open: {
            transition: { staggerChildren: 0.1, delayChildren: 0.1 },
        },
        closed: {
            transition: { staggerChildren: 0.05, staggerDirection: -1 },
        },
    };
    useEffect(() => {
        const handleResize = () => setIsMoreThanLG(window.innerWidth > 1024)
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // Variants for each li
    const itemVariants = {
        open: { opacity: 1, x: 0 },
        closed: { opacity: 0, x: 20 },
    };

    return (
        <>
            {/* Overlay */}
            <AnimatePresence>
                {isOpen && isMoreThanLG && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-dark-1/50 z-1"
                        onClick={() => toggle()}
                    />
                )}
            </AnimatePresence>
            <motion.div
                animate={{
                    width: isMoreThanLG ? (isOpen ? 250 : 70) : '100%',
                }}
                transition={{ stiffness: 200, damping: 20, duration: .7 }}
                className="h-full bg-dark-2 text-white min-w-[70px] shadow-lg overflow-hidden relative z-1"
            >
                {/* Menu button */}
                <button
                    title="Toggle Menu"
                    onClick={() => toggle()}
                    className="relative py-5 w-full cursor-pointer bg-card flex ">
                    <div

                        className="flex items-center justify-center w-full h-10 rounded-full text-white "
                    >
                        {isOpen ? <HiX size={20} /> : <HiMenu size={20} />}
                    </div>
                </button>

                {/* Active indicator when collapsed */}
                <AnimatePresence>
                    {!isOpen && activeIndex !== -1 && (
                        <motion.span
                            key={pathname}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex items-center justify-center  w-full   absolute top-20 mt-10   rotate-90 uppercase text-xs tracking-widest font-bold text-text/80"
                        >
                            {pathname === "/" ? "Home" : pathname.replace("/", "")}
                        </motion.span>
                    )}
                </AnimatePresence>
                {/* Nav links with staggered animation */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.ul
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={listVariants}
                            className="flex flex-col gap-3 w-full !shrink-0  px-2 justify-center items-center  h-[80%]"
                        >
                            {NAV_ITEMS.map((item) => (
                                <motion.li
                                    key={item.href}
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Link
                                        href={item.href}
                                        onClick={close}
                                        className={`rounded-md px-3 py-1 uppercase font-medium cursor-pointer text-text duration-300 transition-all hover:text-white text-xs`}
                                    >
                                        {item.label}
                                    </Link>
                                </motion.li>
                            ))}
                        </motion.ul>
                    )}
                </AnimatePresence>
            </motion.div>
        </>
    );
};

export default Navbar;
