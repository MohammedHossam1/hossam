import { IProject } from "@/types";

export const SKILLS = [
    { name: "CSS", percent: 85 },
    { name: "Js", percent: 75 },
    { name: "PHP", percent: 65 },
    { name: "Wordpress", percent: 85 },
]
export const projects: IProject[] = [
    { id: "1", slug: "project", name: "Project One", description: "Description for project one.", url: "/project1.jpg", code: "", images: [""], skills: [""], demo: "", price: 0, featured: false },
    { id: "2", slug: "project", name: "Project Two", description: "Description for project two.", url: "/project2.jpg", code: "", images: [""], skills: [""], demo: "", price: 0, featured: false },
    { id: "3", slug: "project", name: "Project Three", description: "Description for project three.", url: "/project3.jpg", code: "", images: [""], skills: [""], demo: "", price: 0, featured: false },
    { id: "4", slug: "project", name: "Project Four", description: "Description for project four.", url: "/project4.jpg", code: "", images: [""], skills: [""], demo: "", price: 0, featured: false },
    { id: "5", slug: "project", name: "Project Five", description: "Description for project five.", url: "/project5.jpg", code: "", images: [""], skills: [""], demo: "", price: 0, featured: false },
];
export const address = [
    {
      name: "Egypt",
      title: "Residence : "
    },
    {
      name: "Giza",
      title: "City : "
    },
    {
      name: "28",
      title: "Age : "
    }
  ]