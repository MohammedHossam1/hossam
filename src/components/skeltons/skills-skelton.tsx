import React from 'react'

const SkillsSkelton = () => {
    return (
        <>
            {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                    <div className="flex justify-between font-medium mb-1">
                        <span className='capitalize bg-card h-1 w-24 rounded'></span>
                        <span className='bg-card h-3 w-10 rounded'></span>
                    </div>
                    <div className="w-full bg-dark-1 h-1 rounded">
                        <div className="bg-card h-1 rounded w-1/2"></div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default SkillsSkelton