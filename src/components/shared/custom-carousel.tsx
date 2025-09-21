"use client";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { ReactNode, useEffect, useState } from "react";

interface IProp {
  dots?: boolean;
  arrowsBottom?: boolean;
  children: ReactNode;
}

export function CustomCarousel({
  dots = true,
  children,
}: IProp) {
  const [api, setApi] = useState<any>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!api) return;
    const update = () => {
      const selected = api.selectedScrollSnap();
      setSelectedIndex(selected);
      setScrollSnaps(api.scrollSnapList());
    };

    api.on("select", update);
    update();

    return () => {
      api.off("select", update);
    };
  }, [api]);

  return (
    <div className="relative w-full block">
      <Carousel opts={{ align: "start" }} className="w-full" dir="ltr" setApi={setApi}>
        <CarouselContent>
          {children}
        </CarouselContent>

        {/* Arrows */}
        <div className="absolute right-10 -bottom-4 lg:-bottom-5 z-50 flex items-center gap-2">
          <CarouselPrevious className="text-gray-500 hover:bg-transparent hover:text-main bg-transparent border-0 left-0" />
          <CarouselNext className="text-gray-500 hover:bg-transparent hover:text-main bg-transparent border-0" />
        </div>
      </Carousel>

      {/* Dots */}
      {dots && (
        <div className="flex justify-start mt-4 gap-2" dir="ltr">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`w-2 h-1 rounded-full transition-all duration-500 cursor-pointer 
                ${index === selectedIndex ? "bg-gradient-blue w-5 bg-main" : "bg-card"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
