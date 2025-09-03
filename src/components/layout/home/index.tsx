'use client'
import React from 'react'
import Hero from '../hero'
import FeaturedProjects from '../projects/featured-projects'
import ExperienceTimeline from '../experience'
import { IProject } from '@/types'
import { motion } from 'framer-motion'

const HomeUI = ({ data }: { data?: IProject[] }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative z-2 py-5 lg:py-16 space-y-8">
            <Hero />
            <FeaturedProjects data={data || []} />
            <ExperienceTimeline />
        </motion.div>
    )
}

export default HomeUI