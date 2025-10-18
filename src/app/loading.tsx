import Image from 'next/image'

const Loading = ({ small = false }: { small?: boolean }) => {
  return (
    <div className={`flex justify-center items-center  ${small ? "" : "h-[calc(100dvh-68px)] lg:h-[calc(100dvh)]"} relative`}>
      <div className={` ${small ? "size-10" : " absolute size-34 md:size-40"} rounded-full border-4  border-t-main border-gray-700 animate-spin`}></div>
      {!small && 
      <div className="relative size-28 md:size-32 rounded-full overflow-hidden  z-10">
        <Image
          src={'/loader.svg'}
          alt="Loader Image"
          fill
          sizes="(max-width: 768px) 100vw, 
          (max-width: 1200px) 50vw, 
          33vw"
          priority
          className="object-cover"
        />
      </div>}
    </div>
  )
}

export default Loading
