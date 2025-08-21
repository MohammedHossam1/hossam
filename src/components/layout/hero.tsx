import { Button } from "../ui/button"

const Hero = () => {
    return (
        <div className="relative ">
            <div className="absolute bottom-full inset-x-10 h-7 bg-dark-2"></div>
            <div className="relative bg-[url('/as.jpg')] text-white bg-cover bg-center h-[60vh] lg:h-[45vh] px-5 lg:px-14">
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-dark-3/70 rounded-none"></div>

                {/* Content */}
                <div className="relative xl:w-4/7 h-full flex flex-col justify-center gap-3">
                    <h1 className="text-5xl font-extrabold">
                        Discover my Amazing Art Space!
                    </h1>
                    <p className="text-sm">
                        {"<"} <span className="text-main ">{"code"}</span> {">"} I build
                        automation tools. <span className="text-main">{"<code>"}</span>
                    </p>
                    <Button className="w-fit px-10 py-5">Get Started</Button>
                </div>
            </div>
        </div>
    )
}

export default Hero
