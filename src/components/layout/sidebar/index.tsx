"use client"
import { useSideSkills, useSkills } from '@/hooks';
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
    name: "27",
    title: "Age : "
  }
]
const Seperator = () => <div className="w-full h-[1px] bg-text/30 my-5" />
const SideBar = () => {
  const { data, isLoading, isError }: UseQueryResult<{ data: ISkill[] }, Error> = useSkills();
  const { data: sideData }: UseQueryResult<{ skill: string }[], Error> = useSideSkills();
  const handleDownload = async () => {
    if (!sideData || sideData.length === 0) return;

    try {
      const response = await fetch(sideData[0].skill);
      if (!response.ok) throw new Error("Failed to fetch file");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "MohammedHossamCV.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error:", error);
    }
  };


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
          {isLoading && (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="flex justify-between font-medium mb-1">
                  <span className='capitalize bg-gray-700 h-3 w-24 rounded'></span>
                  <span className='bg-gray-700 h-3 w-10 rounded'></span>
                </div>
                <div className="w-full bg-gray-700 h-1 rounded">
                  <div className="bg-gray-500 h-1 rounded w-1/2"></div>
                </div>
              </div>
            ))
          )}
          {isError && <p>Error loading skills</p>}
          {!isLoading && !isError && data?.data?.map((skill) => (
            <div key={skill.id}>
              <div className="flex justify-between font-medium mb-1">
                <span className='capitalize'>{skill.name}</span>
                <span className='text-text'>{skill.percent}%</span>
              </div>
              <div className="w-full bg-gray-700 h-1 rounded">
                <div className="bg-main h-1 rounded" style={{ width: `${skill.percent}%` }}></div>
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
        {!sideData || sideData?.length == 0 ? null :
          <button
            onClick={handleDownload}
            className="text-text cursor-pointer text-[13px] hover:bg-transparent hover:text-main bg-transparent font-medium text-start w-fit p-0 m-0 tracking-wider"
          >
            DOWNLOAD CV ⬇
          </button>
        }
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
