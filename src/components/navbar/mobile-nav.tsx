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
        <div className="lg:!hidden w-full flex items-center justify-between p-5   relative">

            {/* Profile Sidebar */}
            {isLG && <Sheet open={isOpenProfile} onOpenChange={(openState) => {
                if (openState) openProfile();
                else closeProfile();
            }}>
                <SheetTrigger className="!border-0" asChild>
                    <EllipsisVertical className="size-5 hover:text-white duration-300 transition-all cursor-pointer" />
                </SheetTrigger>
                <SheetContent side="left" className="bg-dark-1 !border-0 text-white w-72">
                    {/* لازم DialogTitle يكون هنا */}
                    <DialogTitle className="sr-only">Profile Sidebar</DialogTitle>
                    <SideBar />
                </SheetContent>
            </Sheet>
            }
            <Link href="/" className="lg:hidden">
                <h1 className="font-bold text-xl uppercase tracking-widest hover:text-main cursor-pointer block duration-500 transition-all">Fayyad</h1>
            </Link>
            {/* Main Navbar */}
            {isLG && <Sheet open={isOpen} onOpenChange={(openState) => {
                if (openState) open();
                else close();
            }}>
                <SheetTrigger className="!border-0" asChild>
                    <HiMenu className="size-5  cursor-pointer" />
                </SheetTrigger>
                <SheetContent side="right" className="bg-dark-1 !border-0 text-white w-64">
                    <DialogTitle className="sr-only">Main Navigation</DialogTitle>
                    <Navbar />
                </SheetContent>
            </Sheet>}
        </div>
    )
}

export default MobileNav
