import React, { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface FadeEffectProps {
  children: ReactNode
  duration?: number
  delay?: number
}

const FadeEffect: React.FC<FadeEffectProps> = ({
  children,
  duration = 0.6,
}) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}   
      animate={{ opacity: 1, y: 0 }}   
      exit={{ opacity: 0, y: -10 }}     
      viewport={{ once: true }}
      transition={{
        duration,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.section>
  )
}

export default FadeEffect
