"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import ProjectCard from "../layout/projects/project-card";
import Link from "next/link";
import ImageFallBack from "./image-fall-back";


interface IProp {
  dots?: boolean;
  arrows?: boolean;
  isProjectDetails?: boolean;
  arrowsBottom?: boolean;
  data: any[];
}

export function CustomCarousel({
  dots = true,
  arrows = false,
  arrowsBottom = false,
  isProjectDetails = false,
  data = [],
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
  }, [api, data?.length]);

  return (
    <div className="relative w-full  block">
      <Carousel
        opts={{ align: "start" }}
        className="w-full"
        dir="ltr"
        setApi={setApi}
      >
        <CarouselContent className="">
          {!isProjectDetails ?
            <>
              {data.map((item, index) => (
                <CarouselItem key={index} className="w-full basis-full md:basis-1/2 lg:basis-1/3 ">
                  <ProjectCard project={item} />
                </CarouselItem>
              ))}
              <CarouselItem className="w-full basis-full md:basis-1/2 lg:basis-1/3 group">
                <Link href={`/projects`} className="bg-card text-white tracking-widest group-hover:text-main shadow-lg flex flex-col h-full items-center justify-center transition-all duration-300">
                  All Projects
                </Link>
              </CarouselItem>
            </>
            :
            data.map((item, index) => (
              <CarouselItem key={index} className="w-full basis-full lg:basis-1/2    overflow-hidden ">
                <ImageFallBack src={item} alt={item} width={500} height={500} className="object-cover w-full max-h-[300px]  h-full  object-top"/>
              </CarouselItem>
            ))
          }
        </CarouselContent>

        {arrows && (
          <div
            className={`flex items-center max-lg:hidden gap-2 ${arrowsBottom && "absolute -bottom-10  translate-x-17 "
              }`}
          >
            <CarouselPrevious
              className={`bg-gradient-blue border-gradient-blue text-white max-xl:opacity-50 focus:opacity-100 hover:opacity-100 -translate-x-3    ${arrowsBottom ? "" : "max-2xl:dtranslate-x-20"
                } size-12  disabled:bg-transparent  disabled:border-dark-blue  `}
            />
            <CarouselNext
              className={`bg-gradient-blue border-gradient-blue text-white max-xl:opacity-50 focus:opacity-100 hover:opacity-100  translate-x-3 ${arrowsBottom ? "" : "max-2xl:-translate-sx-20"
                } size-12 text-2xl disabled:bg-transparent  disabled:border-dark-blue `}
            />
          </div>
        )}
      </Carousel>

      {dots && (
        <div className="flex justify-start mt-4 gap-2" dir="ltr">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`w-2  h-1 rounded-full  bg-card transition-all duration-500 cursor-pointer ${index === selectedIndex ? "bg-gradient-blue w-5 bg-main" : "bg-card"
                }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
