'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, ReactNode } from 'react'

type ImagePreviewerProps = {
  id?: string
  thumbClassName?: string
  previewClassName?: string
  rounded?: boolean
  overlay?: ReactNode
  children: ReactNode
}

const ImagePreviewer = ({
  id,
  thumbClassName = '',
  previewClassName = 'max-w-[90%] max-h-[90%] rounded-lg shadow-lg object-cover',
  rounded = true,
  overlay,
  children,
}: ImagePreviewerProps) => {
  const [previewOpen, setPreviewOpen] = useState(false)
  const layoutId = id || `preview-${Math.random().toString(36).substr(2, 9)}`

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPreviewOpen(false)
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  return (
    <>
      {/* Thumbnail */}
      <div
        className={`relative group cursor-pointer inline-block ${thumbClassName}`}
        onClick={() => setPreviewOpen(true)}
      >
        <motion.div layoutId={layoutId} className={`relative h-70 ${rounded ? 'rounded-full' : 'rounded-lg'}`}>
          {children}
        </motion.div>

        {/* Overlay */}
        <div
          className={`absolute inset-0 flex items-center justify-center bg-black/50 
          opacity-0 group-hover:opacity-100 transition 
          ${rounded ? 'rounded-full' : 'rounded-lg'}`}
        >
          {overlay}
        </div>
      </div>

      {/* Fullscreen Preview */}
      <AnimatePresence>
        {previewOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-[5022]"
            onClick={() => setPreviewOpen(false)}
          >
            <motion.div
              layoutId={layoutId}
              className={`${previewClassName}`}
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ImagePreviewer
