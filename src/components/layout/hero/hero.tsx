import Link from "next/link"
import ImageFallBack from "../../shared/image-fall-back"
import { Button } from "../../ui/button"
import TextAnimation from "./text-animation"

const Hero = () => {
    return (

        <div className="relative">
            <div className="absolute bottom-full inset-x-2 lg:inset-x-10 h-3 lg:h-7 bg-dark-2"></div>
            <div className="relative bg-[url('/as.jpg')] text-white bg-cover bg-center h-[30vh] lg:h-[320px] px-5 lg:px-14 flex   ">
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-dark-3/50 lg:bg-dark-3/30 rounded-none"></div>

                {/* Content */}
                <div
                    className="relative xl:w-full duration-700 transition-all h-full flex flex-col justify-center gap-3 lg:gap-5"
                >
                    <h1
                        className="text-5xl font-extrabold"
                    >
                        Explore My World!
                    </h1>
                    {/* typing text */}
                    <TextAnimation />
                    <div >
                        <Link href="/projects" className="block !font-bold ">
                            <Button className="w-fit !px-10 !py-5 tracking-wider uppercase text-black/90 !font-semibold">
                                Explore now
                            </Button>
                        </Link>
                    </div>
                </div>
                {/* الصورة */}
                <div
                    className="relative w-full max-2xl:hidden group">
                    <div className="absolute bottom-4 -translate-x-20 h-full z-0">
                        <ImageFallBack
                            width={1500}
                            height={1500}
                            src="/ava.png"
                            placeholder="blur"
                            blurDataURL="/ava.png"
                            alt="avatar"
                            className="w-full h-full  scale-110 "
                        />

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Hero
