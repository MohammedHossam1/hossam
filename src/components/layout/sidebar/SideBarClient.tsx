'use client'
import { address } from '@/constants';
import { FaCheck, FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import DownloadCV from './download-cv';
import ProfileImage from './profile-image';
import Seperator from './seperator';
import { ISkill } from '@/types';
import { motion } from 'framer-motion';
import SkillsSkelton from '@/components/skeltons/skills-skelton';
const SideBarClient = ({ data }: { data: ISkill[] }) => {
    return (
        <aside className="bg-dark-2 !text-[13px] text-white w-full h-full  flex flex-col items-center overflow-hidden ">
            {/* profile */}
            <ProfileImage />
            {/* content */}
            <div className="w-full  p-3 xl:px-8  space-y-4 overflow-auto hide-scrollbar">
                <div className=" w-full  space-y-1  ">
                    {address.map((item, index) => <div key={index} className="flex items-center justify-between w-full ">
                        <h3 className='text-white'>{item.title}</h3>
                        <h3 className="text-text">{item.name}</h3>
                    </div>)}
                </div>
                <Seperator />
                {/* Skills Progress Bars */}
                <div className="w-full space-y-4">
                    {!data && <SkillsSkelton />}
                    {data && data?.slice(0, -1).map((skill) => (
                        <div key={skill.id}>
                            <div className="flex justify-between font-medium mb-1">
                                <span className='capitalize'>{skill.name}</span>
                                <span className='text-text'>{skill.percent}%</span>
                            </div>
                            <div className="w-full bg-dark-1 h-1 rounded">
                                <motion.div
                                    className="bg-main h-1 rounded"
                                    initial={{ width: 0 }}
                                    viewport={{ once: true }}
                                    animate={{ width: `${skill.percent}%` }}
                                    transition={{ duration: 2, ease: "easeOut", delay: 1 }}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <Seperator />
                {/* Skills List */}
                <ul className="space-y-2  text-text ">
                    {[
                        "Shadcn, Framer-motion",
                        "React-hook-form, Zod, Yup",
                        "Redux Toolkit, Zustand, Context",
                        "GIT knowledge",
                    ].map((item, index) => (
                        <li key={index} className="flex items-center gap-2">
                            <FaCheck className="text-main" /> {item}
                        </li>
                    ))}
                </ul>

                <DownloadCV data={data} />
            </div>
            {/* Social Links */}
            <div className="bg-dark-3 w-full flex items-center justify-between gap-4 py-4 text-text px-8 mt-auto">
                <a target='_blank' href="https://www.linkedin.com/in/mohammedfayyad" className="hover:text-main" aria-label="LinkedIn">
                    <FaLinkedin size={14} />
                </a>
                <a target='_blank' href="https://www.facebook.com/muhamedhoss" className="hover:text-main" aria-label="Facebook">
                    <FaFacebook size={14} />
                </a>
                <a target='_blank' href="https://github.com/MohammedHossam1" className="hover:text-main" aria-label="Github">
                    <FaGithub size={14} />
                </a>
                <a target='_blank' href="https://www.instagram.com/mohammedhossam.dev/" className="hover:text-main" aria-label="Instagram">
                    <FaInstagram size={14} />
                </a>
                <a target='_blank' href="https://wa.me/+201125997082" className="hover:text-main" aria-label="whats app">
                    <FaWhatsapp size={14} />
                </a>
            </div>
        </aside>
    )
}

export default SideBarClient