"use client";
import { CustomCarousel } from "@/components/shared/custom-carousel";
import SectionHeader from "@/components/shared/section-header";
import Link from "next/link";
import { useState } from "react";
import ProjectNextPrevContact from "./project-next-prev-contact";
import ImageFallBack from "@/components/shared/image-fall-back";
import { motion, AnimatePresence } from "framer-motion";
import { CarouselItem } from "@/components/ui/carousel";
import { ZoomIn } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

// --- Types ---
export type IProject = {
    id: string;
    slug: string;
    name: string;
    url: string; // cover image
    images: string[];
    description: string;
    skills: string[];
    code: string; // github url
    demo: string; // live url
};
export default function ProjectDetails({ data, prev, next }: { data: IProject, slug: string, prev: string | null, next: string | null }) {

    const [expanded, setExpanded] = useState(false);
    const [open, setOpen] = useState(false);
    const [img, setImg] = useState(data.url?.trim() || "");
    const openLightbox = (img: string) => {
        setImg(img);
        setOpen(true);
    }

    const SectionHead = ({ title }: { title: string }) => {
        return (
            <h2 className="text-white text-sm  font-semibold mb-2">
                {title}
            </h2>
        )
    }
    return (
        <>

            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                viewport={{ once: true }}
                className="w-full py-5 relative">
                <div className="space-y-3 lg:space-y-8 ">
                    <div className="">

                        <SectionHeader title={data.name} />
                        <div className="relative overflow-hidden rounded-lg group">
                            <div
                                onClick={() => openLightbox(img)}
                                className="absolute inset-0 z-20 cursor-pointer bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300"
                            >
                                <ZoomIn className="text-white w-8 h-8" />
                            </div>
                            <ImageFallBack key={img} src={img} alt={data.name} width={1000} height={1000} className="w-full max-h-[400px] h-full object-cover cursor-pointer" />
                        </div>
                    </div>
                    {data.images.length > 0 &&
                        <CustomCarousel >
                            {data.images.map((item, index) => (
                                <CarouselItem key={index}
                                    className="w-full basis-full sm:basis-1/2 md:basis-1/3 overflow-hidden ">
                                    <div className="relative group cursor-pointer overflow-hidden rounded-md">
                                        <div
                                            onClick={() => openLightbox(item)}
                                            className="absolute inset-0 z-20 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300"
                                        >
                                            <ZoomIn className="text-white w-6 h-6" />
                                        </div>
                                        <ImageFallBack src={item} alt={item} width={500} height={500} className="object-cover w-full h-[300px] object-top" />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CustomCarousel>
                    }
                    <div className="">
                        <SectionHeader title={"Project Details"} />
                        <header className=" grid gap-2 lg:gap-6 grid-cols-1 md:grid-cols-3 items-center h-full ">
                            <div className="bg-card p-2  py-4 lg:p-6 h-full col-span-1 md:col-span-2">
                                <SectionHead title="Description" />
                                <AnimatePresence mode="wait">

                                    <div
                                    >
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{
                                                opacity: 1,
                                                height: expanded ? "auto" : 96
                                            }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.5, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <p className="text-text leading-6 text-[13px] font-light">
                                                {data.description}
                                            </p>


                                        </motion.div>
                                        {data.description.split(" ").length > 50 && (
                                            <button
                                                onClick={() => setExpanded(!expanded)}
                                                className="mt-1 text-main text-xs tracking-widest cursor-pointer font-bold group"
                                            >
                                                {expanded ? "Show Less" : "Read More"}
                                            </button>
                                        )}
                                    </div>
                                </AnimatePresence>

                            </div>
                            {/* Details Card */}
                            <aside className=" bg-card p-2 py-4 lg:p-6  h-full  ">
                                <div className="flex items-center gap-2 text-text/80">
                                    <SectionHead title="Technologies" />
                                </div>
                                <div className=" flex flex-wrap gap-1 mb-5">
                                    {data.skills.map((s: string, i: number) => (
                                        <span key={i} className="px-2 py-1 rounded-sm bg-dark-3 text-text text-[10px] capitalize">
                                            {s}
                                        </span>
                                    ))}
                                </div>

                                <div className=" grid gap-1 text-sm">
                                    {data.demo && (
                                        <>
                                            <SectionHead title="Live Demo" />
                                            <Link href={data.demo} target="_blank" className="truncate text-main hover:underline">
                                                {data.demo}
                                            </Link>
                                        </>
                                    )}
                                    {data.code && (
                                        <>
                                            <SectionHead title="Code" />
                                            <Link href={data.code} target="_blank" className="truncate hover:underline">
                                                {data.code}
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </aside>
                        </header>
                    </div>

                    <ProjectNextPrevContact next={next || ""} prev={prev || ""} />



                </div >
            </motion.section >

            {/* Lightbox Dialog */}
            <Dialog open={open} onOpenChange={setOpen} modal={false}>

                {open && <div
                    data-slot="dialog-overlay"
                    className={
                        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50"
                    }
                />}

                <DialogContent className="max-w-4xl bg-dark-1/95 border-dark-3 p-2 sm:p-4 overflow-hidden">
                    <DialogTitle className="sr-only">{data.name} preview</DialogTitle>
                    <div className="relative w-full max-h-[80vh] h-[60vh] sm:h-[75vh] flex items-center justify-center">
                        <ImageFallBack
                            src={img}
                            alt={data.name}
                            fill
                            className="object-contain w-full h-full"
                        />
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

