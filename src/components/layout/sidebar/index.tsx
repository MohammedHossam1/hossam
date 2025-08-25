"use client"
import { useSkills } from '@/hooks';
import { ISkill } from '@/types';
import { UseQueryResult } from '@tanstack/react-query';
import { FaCheck, FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import ProfileImage from './profile-image';
const address = [
  {
    name: "Egypt",
    title: "Residence : "
  },
  {
    name: "Giza",
    title: "City : "
  },
  {
    name: "Egypt",
    title: "27 : "
  }
]
const Seperator = () => <div className="w-full h-[1px] bg-text/30 my-5" />
const SideBar = () => {
  const { data, isLoading, isError }: UseQueryResult<{ data: ISkill[] }, Error> = useSkills();
  return (
    <aside className="bg-dark-2 !text-[13px] text-white w-full h-full  flex flex-col items-center overflow-hidden ">
      {/* profile */}
      <ProfileImage />
      {/* content */}
      <div className="w-full  p-3 xl:p-8 space-y-4 overflow-auto hide-scrollbar">

        <div className=" w-full  space-y-1  ">
          {address.map((item, index) => <div key={index} className="flex items-center justify-between w-full ">
            <h3 className='text-white'>{item.title}</h3>
            <h3 className="text-text">{item.name}</h3>
          </div>)}
        </div>
        <Seperator />
        {/* Skills Progress Bars */}
        <div className="w-full space-y-4">
          {isLoading && <p>Loading skills...</p>}
          {isError && <p>Error loading skills</p>}
          {!isLoading && !isError && data?.data?.map((skill) => (
            <div key={skill.id}>
              <div className="flex justify-between font-medium mb-1">
                <span className='capitalize'>{skill.name}</span>
                <span className='text-text'>{skill.percent}%</span>
              </div>
              <div className="w-full bg-gray-700 h-1">
                <div className="bg-main h-1" style={{ width: `${skill.percent}%` }}></div>
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

        {/* Download CV */}
        <a
          href="/cv.pdf"
          download
          className="text-text text-[13px] hover:bg-transparent hover:text-main bg-transparent font-medium text-start w-fit p-0 m-0 tracking-wider"
        >
          DOWNLOAD CV ⬇
        </a>
      </div>
      {/* Social Links */}
      <div className="bg-dark-3 w-full flex items-center justify-between gap-4 py-4 text-text px-8 mt-auto">
        <a href="https://www.linkedin.com/in/mohammedfayyad" className="hover:text-main" aria-label="LinkedIn">
          <FaLinkedin size={14} />
        </a>
        <a href="https://www.facebook.com/muhamedhoss" className="hover:text-main" aria-label="Facebook">
          <FaFacebook size={14} />
        </a>
        <a href="https://github.com/MohammedHossam1" className="hover:text-main" aria-label="Github">
          <FaGithub size={14} />
        </a>
        <a href="https://www.instagram.com/mohammedhossam.dev/" className="hover:text-main" aria-label="Instagram">
          <FaInstagram size={14} />
        </a>
        <a href="https://wa.me:+201125997082" className="hover:text-main" aria-label="whats app">
          <FaWhatsapp size={14} />
        </a>

      </div>
    </aside>
  );
};

export default SideBar;
