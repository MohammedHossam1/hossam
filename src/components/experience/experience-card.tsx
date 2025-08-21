import React from 'react'

interface Props {
    title: string,
    role: string,
    data: string,
    description: string
}
const ExperienceCard = ({ title, role, data, description }: Props) => {
    return (
        <div className=' p-4 shadow-md'>
            <div className="flex items-center justify-between ">
                <div className="">
                    <h2 className='text-white'>{title}</h2>
                    <h3>{role}</h3>
                </div>
                <div className="bg-dark-1 text-text">
                    {data}
                </div>
            </div>
            <p className='text-text'>{description}</p>
        </div>
    )
}

export default ExperienceCard