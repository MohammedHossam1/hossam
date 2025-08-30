'use client'
import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "../ui/button"

const Hero = () => {
    const fullText = "create web apps with ease."
    const [displayText, setDisplayText] = useState("")
    const [isDeleting, setIsDeleting] = useState(false)
    const [index, setIndex] = useState(0)
    const speed = 50

    useEffect(() => {
        const handle = setTimeout(() => {
            if (!isDeleting) {
                setDisplayText(fullText.slice(0, index + 1))
                setIndex(index + 1)

                if (index + 1 === fullText.length) {
                    setTimeout(() => setIsDeleting(true), 1000)
                }
            } else {
                setDisplayText(fullText.slice(0, index - 1))
                setIndex(index - 1)

                if (index - 1 === 0) {
                    setIsDeleting(false)
                }
            }
        }, speed)

        return () => clearTimeout(handle)
    }, [index, isDeleting])

    return (
        <div className="relative">
            <div className="absolute bottom-full inset-x-2 lg:inset-x-10 h-3 lg:h-7 bg-dark-2"></div>

            <div className="relative bg-[url('/as.jpg')] text-white bg-cover bg-center h-[60vh] lg:h-[45vh] px-5 lg:px-14 " >
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-dark-3/70 rounded-none"></div>

                {/* Content */}
                <div className="relative xl:w-4/7 h-full flex flex-col justify-center gap-3 lg:gap-5">
                    <h1 className="text-5xl font-extrabold">
                        Explore My  World!
                    </h1>
                    <p className="text-sm font-mono  lg:tracking-widest flex items-center gap-1">
                        {" <"} <span className="text-main  ">{"code"}</span> {">"}{" "}
                        {displayText}
                        <span className=" animate-pulse">|</span>
                        {" </"} <span className="text-main  ">{"code"}</span> {">"}
                    </p>
                    <Link href="/projects" className="block !font-bold ">
                        <Button className="w-fit !px-10 !py-5 tracking-wider  uppercase text-black/90  !font-semibold ">Explore now</Button>
                    </Link>
                </div>
                {/* <div className=" relative ">
                    <Image
                        src="/removed.png"
                        alt="Hero"
                        width={2220}
                        height={2120}
                        className="w-full h-full object-cover opacity-0"
                    />
                    <Image
                        src="/removed.png"
                        alt="Hero"
                        width={2220}
                        height={2120}
                        className=" object-cover absolute -top-3 scale-110"
                    />
                </div> */}
            </div>
        </div>
    )
}

export default Hero
