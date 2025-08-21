'use client'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import React, { ReactNode } from 'react'
import { DotButton, useDotButton } from './EmblaCarouselDotButton'
import { useLocale } from 'next-intl'
// import '../empla/embla.css';
type PropType = {
  fade?: boolean
  numbers?: boolean
  children: ReactNode
  options?: EmblaOptionsType
  buttonPositions?: "start" | "center" | "end"
}

/** @param options   options for more control on empla carousel options*/
/** @param fade   a boolean var to choosen between fade effect or noraml slide */
/** @param numbers   a boolean for if you want to appears the number of the slider apove the dots*/
/** @param buttonPositions   center | end | start =>  that makes you able to choose where the dots will be     */
/** @param children      the content */


const EmblaCarousel: React.FC<PropType> = (props) => {
  const l = useLocale();
  const { options, numbers, buttonPositions = 'center', children } = props
  const OPTIONS: EmblaOptionsType = {
    loop: true,
    duration: 30,
    direction: l === 'ar' ? 'rtl' : 'ltr',
    ...options
  };
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS, [])

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)
  const buttonPosition = buttonPositions == "center" ? "justify-center" : buttonPositions == "end" ? "justify-end" : "justify-start"

  return (
    <div className="embla ">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container  py-10">
          {/* must wrapped every slide  in   
          <div key={index} className="embla__slide  basis-full | basic-1/2 | basic-1/3 ....  "> 
          */}
          {children}
        </div>
      </div>
      {/* BUTTONS */}
      <div className={`embla__controls flex ${buttonPosition}`}>
        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              selectedIndex={numbers ? index + 1 : 0}
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'!bg-main/20 !mx-1  block embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected !bg-main/100' : ''
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default EmblaCarousel
