import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { IoIosArrowBack } from "react-icons/io";

const ProjectNextPrevContact = ({ next, prev }: { next: string, prev: string }) => {
    const nextTrimed = next.trim();
    const prevTrimed = prev.trim();
    return (
        <section className="">
            <div className="relative bg-[url('/as.jpg')] text-white bg-cover bg-center h-[25vh] sm:h-[35vh] lg:h-[45vh] px-5 lg:px-14 shadow-lg">
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-dark-3/80 rounded-none"></div>
                <div className="text-white relative flex items-center justify-center flex-col gap-2 h-full ">
                    <h3 className='text-lg sm:text-[32px] xl:text-[42px] font-extrabold text-center'>Ready to order your project?  </h3>
                    <p className='tracking-[.15rem] text-sm font-mono'>Let&apos;s work together! </p>
                    <Link href='/contact'>
                        <Button className='uppercase lg:px-10 lg:py-6 shadow-2xl text-xs font-mono font-bold tracking-widest lg:mt-5'>Contact Me</Button>
                    </Link>
                </div>
            </div>
            <div className="py-7 px-5  bg-card flex justify-between">
                <Link href={"/projects/"+prevTrimed} className='text-main text-nowrap  text-xs font-semibold lg:tracking-widest uppercase flex gap-2 items-center group text-[11px]'>
                    <IoIosArrowBack className='max-lg:hidden group-hover:-translate-x-1 transition-all duration-300 font-extrabold ' />  Previous project
                </Link>
                <Link href="/projects" className='text-text  text-nowrap text-[11px] sm:text-xs font-semibold lg:tracking-widest uppercase flex gap-2 items-center hover:text-white transition-all                duration-900'>
                    All projects
                </Link>
                <Link href={"/projects/" + nextTrimed} className='text-main text-nowrap text-xs font-semibold lg:tracking-widest uppercase flex gap-2 items-center group text-[11px]'>
                    Next project  <IoIosArrowBack className=' max-lg:hidden group-hover:translate-x-1 transition-all duration-300 font-extrabold rotate-180' />
                </Link>
            </div>
        </section>
    )
}

export default ProjectNextPrevContact