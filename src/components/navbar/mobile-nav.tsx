'use client'
import { useNavbarStore, useProfileStore } from '@/store'
import { EllipsisVertical } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { HiMenu } from 'react-icons/hi'
import Navbar from '.'
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { DialogTitle } from '@radix-ui/react-dialog'
import { motion, AnimatePresence } from 'framer-motion'
import SideBar from '../layout/sidebar'
import Link from 'next/link'

const MobileNav = () => {
    const { isOpen, open, close } = useNavbarStore();
    const { isOpenProfile, openProfile, closeProfile } = useProfileStore();
    const [isLG, setIsLG] = useState(false)

    useEffect(() => {
        const handleResize = () => setIsLG(window.innerWidth < 1024)
        handleResize() // initialize on mount
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            layout
            className="lg:!hidden w-full flex items-center justify-between p-5 relative"
        >

            <AnimatePresence>
                {isLG && (
                    <motion.div
                        key="profile"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Sheet open={isOpenProfile} onOpenChange={(openState) => {
                            if (openState) openProfile();
                            else closeProfile();
                        }}>
                            <SheetTrigger className="!border-0" asChild>
                                <EllipsisVertical className="size-5 hover:text-white duration-300 transition-all cursor-pointer" />
                            </SheetTrigger>
                            <SheetContent side="left" className="bg-dark-1 !border-0 text-white w-72">
                                <DialogTitle className="sr-only">Profile Sidebar</DialogTitle>
                                <SideBar />
                            </SheetContent>
                        </Sheet>
                    </motion.div>
                )}
            </AnimatePresence>
            <motion.div
                layout
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <Link href="/">
                    <h1 className="font-bold text-xl uppercase tracking-widest hover:text-main cursor-pointer block duration-500 transition-all">
                        Fayyad
                    </h1>
                </Link>
            </motion.div>

            <AnimatePresence>
                {isLG && (
                    <motion.div
                        key="menu"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Sheet open={isOpen} onOpenChange={(openState) => {
                            if (openState) open();
                            else close();
                        }}>
                            <SheetTrigger className="!border-0" asChild>
                                <HiMenu className="size-5 cursor-pointer" />
                            </SheetTrigger>
                            <SheetContent side="right" className="bg-dark-1 !border-0 text-white w-64">
                                <DialogTitle className="sr-only">Main Navigation</DialogTitle>
                                <Navbar />
                            </SheetContent>
                        </Sheet>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default MobileNav
