"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ProjectGalleryProps {
  images: string[];
  projectName: string;
}

export default function ProjectGallery({ images, projectName }: ProjectGalleryProps) {
  if (!images || images.length === 0) return null;

  return (
    <div className="mt-6">
      <Carousel className="w-full">
        <CarouselContent>
          {images.map((img, i) => (
            <CarouselItem key={`${img}-${i}`} className="basis-full sm:basis-1/2 lg:basis-1/3">
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="relative aspect-[4/3] overflow-hidden rounded-xl bg-dark-2"
              >
                <Image
                  src={img}
                  alt={`${projectName} ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Controls */}
        <CarouselPrevious className="left-2 sm:-left-8 bg-dark-2/70 hover:bg-dark-2" />
        <CarouselNext className="right-2 sm:-right-8 bg-dark-2/70 hover:bg-dark-2" />
      </Carousel>
    </div>
  );
}
