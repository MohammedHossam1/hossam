'use client';
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { HiMenu, HiX } from "react-icons/hi";

const NAV_ITEMS = [
    { label: "Home", href: "/" },
    { label: "projects", href: "/projects" },
    { label: "videos", href: "/videos" },
    { label: "Contact", href: "/contact" },
];

const Navbar = () => {
    const [open, setOpen] = useState(false);
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

    // Variants for each li
    const itemVariants = {
        open: { opacity: 1, x: 0 },
        closed: { opacity: 0, x: 20 },
    };

    return (
        <motion.div
            animate={{ width: open ? 250 : 70 }}
            transition={{ stiffness: 200, damping: 20, duration: .7 }}

            className="h-full bg-dark-2 text-white relative shadow-lg overflow-hidden"
        >
            {/* Menu button */}
            <button
                onClick={() => setOpen(!open)}
                className="relative py-5 w-full cursor-pointer bg-card flex ">
                <div

                    className="flex items-center justify-center w-full h-10 rounded-full text-white "
                >
                    {open ? <HiX size={20} /> : <HiMenu size={20} />}
                </div>
            </button>

            {/* Active indicator when collapsed */}
            <AnimatePresence>
                {!open && activeIndex !== -1 && (
                    <motion.span
                        key={pathname} // ensure unique key per active page
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center absolute top-20 justify-center mt-10 translate-x-1/3 w-fit rotate-90 uppercase text-xs tracking-widest font-bold text-text/80"
                    >
                        {pathname === "/" ? "Home" : pathname.replace("/", "")}
                    </motion.span>
                )}
            </AnimatePresence>
            {/* Nav links with staggered animation */}
            <AnimatePresence>
                {open && (
                    <motion.ul
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={listVariants}
                        className="flex flex-col gap-3 w-full px-2 justify-center items-center  h-[80%]"
                    >
                        {NAV_ITEMS.map((item) => (
                            <motion.li
                                key={item.href}
                                onClick={() => setOpen(false)}
                                variants={itemVariants}
                                className={` rounded-md px-3 py-1 uppercase font-medium cursor-pointer  text-text text-xs`}
                            >
                                {item.label}
                            </motion.li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Navbar;
