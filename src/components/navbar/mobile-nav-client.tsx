'use client'
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { useNavbarStore, useProfileStore } from '@/store';
import { ISkill } from "@/types";
import { DialogTitle } from '@radix-ui/react-dialog';
import { EllipsisVertical } from 'lucide-react';
import Link from 'next/link';
import { HiMenu } from 'react-icons/hi';
import Navbar from '.';
import SideBarClient from '../layout/sidebar/SideBarClient';
const MobileNavClient = ({ data }: { data: ISkill[] }) => {
    const { isOpen, open, close } = useNavbarStore();
    const { isOpenProfile, openProfile, closeProfile } = useProfileStore();
    if (typeof window !== "undefined" && window.innerWidth >= 1024) return null;

    return (
        <div className="lg:!hidden w-full flex items-center justify-between p-5 relative" >
            {/* Sidebar */}
            <Sheet open={isOpenProfile} onOpenChange={(openState) => {
                if (openState) openProfile();
                else closeProfile();
            }}>
                <SheetTrigger className="!border-0" asChild>
                    <EllipsisVertical className="size-5 hover:text-white duration-300 transition-all cursor-pointer" />
                </SheetTrigger>
                <SheetContent side="left" className="bg-dark-1 !border-0 text-white w-72">
                    <DialogTitle className="sr-only">Profile Sidebar</DialogTitle>
                    <SideBarClient data={data} />
                </SheetContent>
            </Sheet>
            {/* Logo */}
            <Link href="/">
                <h1 className="font-bold text-xl uppercase tracking-widest hover:text-main cursor-pointer block duration-500 transition-all">
                    Fayyad
                </h1>
            </Link>
            {/* Navbar */}
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
        </div>
    )
}

export default MobileNavClient