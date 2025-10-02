'use client'
import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { motion } from "framer-motion"
import ImageFallBack from "../shared/image-fall-back"

const Hero = () => {
    const fullText = "Modern web apps, built right"
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

    // Animation variants
    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.3, delayChildren: 0.5 }
        }
    }

    const item = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    }

    return (
        <div className="relative">
            <div className="absolute bottom-full inset-x-2 lg:inset-x-10 h-3 lg:h-7 bg-dark-2"></div>

            <div className="relative bg-[url('/as.png')] text-white bg-cover bg-center h-[40vh] lg:h-[320px] px-5 lg:px-14 flex   ">
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-dark-3/50 lg:bg-dark-3/30 rounded-none"></div>

                {/* Content */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="visible"
                    className="relative xl:w-full duration-700 transition-all h-full flex flex-col justify-center gap-3 lg:gap-5"
                >
                    <motion.h1
                        variants={item}
                        className="text-5xl font-extrabold"
                    >
                        Explore My World!
                    </motion.h1>

                    <motion.p
                        variants={item}
                        className="text-[12px] text-nowrap sm:text-sm font-mono lg:tracking-widest flex items-center gap-1"
                    >
                        {" <"} <span className="text-main">{"code"}</span> {">"}{" "}
                        {displayText}
                        <span className=" animate-pulse">|</span>
                        {" </"} <span className="text-main">{"code"}</span> {">"}
                    </motion.p>

                    <motion.div variants={item}>
                        <Link href="/projects" className="block !font-bold ">
                            <Button className="w-fit !px-10 !py-5 tracking-wider uppercase text-black/90 !font-semibold">
                                Explore now
                            </Button>
                        </Link>
                    </motion.div>
                </motion.div>
                {/* الصورة */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="relative w-full max-2xl:hidden group">
                    <div className="absolute bottom-4 -translate-x-20 h-full z-0">
                        <ImageFallBack
                            width={1500}
                            height={1500}
                            src="/ava.png"
                            alt="avatar"
                            className="w-full h-full  scale-110 "
                        />
                  
                    </div>
                </motion.div>

            </div>
        </div>
    )
}

export default Hero
