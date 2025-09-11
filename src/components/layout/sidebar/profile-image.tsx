'use client'
import ImageFallBack from '@/components/shared/image-fall-back'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import { MdOutlineZoomOutMap } from "react-icons/md";

const ProfileImage = () => {
  const [previewOpen, setPreviewOpen] = useState(false)

  return (
    <div className="bg-dark-3 w-full flex flex-col items-center py-8">
      <div className="relative group cursor-pointer z-1000" onClick={() => setPreviewOpen(true)}>
        <motion.div layoutId="profile-image">
          <ImageFallBack
            width={150}
            height={150}
            src="/avatar.jpeg"
            alt="profile"
            className="size-20 xl:size-24 rounded-full object-cover"
          />
        </motion.div>

        {/* overlay icon on hover */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition rounded-full">
          <MdOutlineZoomOutMap className="text-white size-6" />
        </div>

        {/* online indicator */}
        <div
          className="absolute bottom-1 end-2 flex items-center justify-center -space-x-3"
          title="Available"
        >
          <div className="size-3 rounded-full bg-main"></div>
          <div className="size-3 rounded-full bg-main animate-ping"></div>
        </div>
      </div>

      <Link href="/" className="mt-3 text-lg xl:text-xl font-bold hover:text-main duration-500 transition-all">Mo Hossam</Link>
      <p className="text-sm text-text">Front-end Developer</p>

      {/* Fullscreen Preview Modal */}
      <AnimatePresence>
        {previewOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-[5022]"
            onClick={() => setPreviewOpen(false)}
          >
            <motion.img
              src="/avatar.jpeg"
              alt="preview"
              layoutId="profile-image"
              className="max-w-[90%] max-h-[90%] rounded-lg shadow-lg object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ProfileImage
