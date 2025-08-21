"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";


interface IProp {
  dots?: boolean;
  arrows?: boolean;
  arrowsBottom?: boolean;
}

export function CustomCarousel({
  dots = true,
  arrows = false,
  arrowsBottom = false,
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
    <div className="relative w-full  block">
      <Carousel
        opts={{ align: "start" }}
        className="w-full"
        dir="ltr"
        setApi={setApi}
      >
        <CarouselContent>
          <CarouselItem className="w-full">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="space-y-6 flex flex-col "></div>
            </div>
          </CarouselItem>
        </CarouselContent>

        {arrows && (
          <div
            className={`flex items-center max-lg:hidden gap-2 ${
              arrowsBottom && "absolute -bottom-10  translate-x-17 "
            }`}
          >
            <CarouselPrevious
              className={`bg-gradient-blue border-gradient-blue text-white max-xl:opacity-50 focus:opacity-100 hover:opacity-100 -translate-x-3    ${
                arrowsBottom ? "" : "max-2xl:dtranslate-x-20"
              } size-12  disabled:bg-transparent  disabled:border-dark-blue  `}
            />
            <CarouselNext
              className={`bg-gradient-blue border-gradient-blue text-white max-xl:opacity-50 focus:opacity-100 hover:opacity-100  translate-x-3 ${
                arrowsBottom ? "" : "max-2xl:-translate-sx-20"
              } size-12 text-2xl disabled:bg-transparent  disabled:border-dark-blue `}
            />
          </div>
        )}
      </Carousel>

      {dots && (
        <div className="flex justify-center mt-4 gap-2" dir="ltr">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`w-3 h-3 rounded-full border border-main ${
                index === selectedIndex ? "bg-gradient-blue w-4" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
