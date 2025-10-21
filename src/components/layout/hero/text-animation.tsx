'use client'
import { motion } from "framer-motion"
import { useEffect, useState } from "react"


const item = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
}

const TextAnimation = () => {
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
    return (
        <motion.p
            variants={item}
            className="text-[12px] text-nowrap sm:text-sm font-mono lg:tracking-widest flex items-center gap-1"
        >
            {" <"} <span className="text-main">{"code"}</span> {">"}{" "}
            {displayText}
            <span className=" animate-pulse">|</span>
            {" </"} <span className="text-main">{"code"}</span> {">"}
        </motion.p>
    )
}

export default TextAnimation