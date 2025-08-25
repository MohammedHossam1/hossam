import Image from 'next/image'

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-4rem)] relative">
      <div className="absolute size-40 rounded-full border-4 border-t-main border-gray-700 animate-spin"></div>
      <div className="relative size-32 rounded-full overflow-hidden z-10">
        <Image
          src={'/avatar.jpeg'}
          alt="Loader Image"
          fill
          sizes="(max-width: 768px) 100vw, 
          (max-width: 1200px) 50vw, 
          33vw" 
          priority
          className="object-cover"
        />
      </div>
    </div>
  )
}

export default Loading
