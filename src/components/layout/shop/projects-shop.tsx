"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CarouselItem } from "@/components/ui/carousel";
import { CustomCarousel } from "@/components/shared/custom-carousel";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { sendMessage } from "@/lib/supabase-methods";
import { useProjects } from "@/hooks";
import { IProject } from "@/types";
import { toast } from "sonner";
import { ShoppingCart, ExternalLink, Check, Send, Sparkles } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

const getProjectPrice = (project: IProject) => {
  return project.price ? `$${project.price}` : "Contact for Price";
};

const getProjectFeatures = (project: IProject) => {
  if (project.slug === "cinestyle") {
    return [
      "Modern React & Next.js codebase",
      "Stunning media production portfolio layout",
      "Fully integrated Supabase backend database",
      "Fully responsive and optimized performance"
    ];
  }
  return [
    "Clean, modular component architecture",
    "Tailwind CSS styling configuration",
    "Production-ready deployment configurations",
    "Responsive layouts for all screen sizes"
  ];
};

const ProjectsShop = () => {
  const { data: projectsData, isLoading } = useProjects(1, 100);
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  // Filter projects by price key
  const shopProjects = projectsData?.data?.filter((p) => p.price && p.price > 0) || [];

  const handleOpenDialog = (project: IProject) => {
    const price = getProjectPrice(project);
    setSelectedProject(project);
    setFormData({
      name: "",
      email: "",
      message: `Hi Mohammed, I am very interested in purchasing your premium project template: "${project.name}" (${price}). Please send me details on payment methods and source code delivery.`
    });
    setIsDialogOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const price = selectedProject ? getProjectPrice(selectedProject) : "";
      const messageBody = `[PURCHASE INQUIRY for: ${selectedProject?.name} - Price: ${price}]\n\nName: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`;
      
      const result = await sendMessage({
        name: formData.name,
        email: formData.email,
        message: messageBody
      });

      if (result.success) {
        toast.success("Purchase request sent successfully! Mo will contact you soon.");
        setIsDialogOpen(false);
      } else {
        toast.error("Failed to submit inquiry. Please try again or use WhatsApp.");
      }
    } catch (error) {
      console.error("Error sending purchase message:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getWhatsAppLink = (project: IProject) => {
    const price = getProjectPrice(project);
    const message = encodeURIComponent(
      `Hi Mohammed, I'd like to purchase your premium template "${project.name}" (${price}). Let me know how we can proceed with payment and file transfer!`
    );
    return `https://wa.me/+201125997082?text=${message}`;
  };

  if (isLoading) {
    return (
      <div className="space-y-4 pt-6">
        <div className="h-6 w-48 bg-dark-2 rounded-md animate-pulse" />
        <div className="h-4 w-72 bg-dark-2 rounded-md animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-card h-80 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  // If there are no buyable projects in the database, we don't display the store section.
  if (shopProjects.length === 0) {
    return null;
  }

  return (
    <section className="text-text space-y-6 pt-6">
      {/* Title Header Section */}
      <div className="flex flex-col gap-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="bg-main/10 text-main text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded">
            Template Store
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-main animate-pulse" />
        </div>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-extrabold text-white tracking-wide flex items-center gap-2 relative">
            🚀 Ready-to-Deploy Premium Templates
          </h2>
        </div>
        <p className="text-xs text-text max-w-2xl leading-relaxed">
          Skip weeks of setup. Purchase clean, hand-crafted, production-ready project boilerplates and deploy in minutes.
        </p>
      </div>

      {/* Slider Carousel */}
      <div className="relative ">
        <CustomCarousel dots={true}>
          <>
            {shopProjects.map((project) => {
              const price = getProjectPrice(project);
              return (
                <CarouselItem key={project.id} className="w-full basis-full  md:basis-1/2 lg:basis-1/3 p-2 h-full">
                  <div className="bg-card border border-dark-3/60  overflow-hidden flex flex-col  group transition-all duration-300 hover:border-main/20 hover:shadow-[0_0_20px_rgba(255,193,7,0.12)]">
                    
                    {/* Image and Price Badge */}
                    <div className="relative w-full h-44 overflow-hidden">
                      <Image
                        src={project.url || "/placeholder/images-placeholder.png"}
                        alt={project.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                      />
                      {/* Price Badge */}
                      <div className="absolute top-3 right-3 bg-main text-dark-1 font-bold text-sm px-3 py-1 rounded shadow-md z-10 flex items-center gap-1">
                        <Sparkles className="size-3 text-dark-1 animate-pulse" />
                        {price}
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                      <div className="space-y-2">
                        {/* Tech Stack Badges */}
                        <div className="flex flex-wrap gap-1.5">
                          {project.skills && project.skills.slice(0, 3).map((tech, idx) => (
                            <span key={idx} className="bg-dark-1 text-text text-[10px] px-2 py-0.5 rounded font-mono capitalize">
                              {tech}
                            </span>
                          ))}
                          {project.skills && project.skills.length > 3 && (
                            <span className="bg-dark-1 text-text text-[10px] px-1.5 py-0.5 rounded font-mono">
                              +{project.skills.length - 3}
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <Link href={`/projects/${project.slug}`} className="text-white text-base font-bold line-clamp-1 group-hover:text-main transition-colors duration-300">
                          {project.name}
                        </Link>

                        {/* Description */}
                        <p className="text-xs text-text line-clamp-3 leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 text-xs font-semibold py-2.5 rounded bg-dark-1 hover:bg-dark-3 text-white transition duration-300 border border-dark-3"
                        >
                          <ExternalLink className="size-3.5" />
                          Live Demo
                        </a>
                        <button
                          onClick={() => handleOpenDialog(project)}
                          className="flex items-center justify-center gap-1.5 text-xs font-bold py-2.5 rounded bg-main hover:bg-main/80 text-dark-1 transition duration-300 cursor-pointer shadow-md"
                        >
                          <ShoppingCart className="size-3.5" />
                          Order Now
                        </button>
                      </div>
                    </div>

                  </div>
                </CarouselItem>
              );
            })}
          </>
        </CustomCarousel>
      </div>

      {/* Buy Now Dialog */}
      {selectedProject && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="bg-dark-2 max-h-[90vh] overflow-y-auto text-white border border-dark-3 max-w-lg p-5 lg:p-7 rounded-xl shadow-2xl">
            <DialogHeader className="space-y-2">
              <div className="flex items-center justify-between gap-4">
                <span className="bg-main text-dark-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                  Premium Code Template
                </span>
                <span className="text-main text-lg font-extrabold">{getProjectPrice(selectedProject)}</span>
              </div>
              <DialogTitle className="text-xl font-bold text-white text-left mt-1">
                Purchase: {selectedProject.name}
              </DialogTitle>
              <DialogDescription className="text-text text-xs text-left leading-relaxed">
                Choose WhatsApp for instant secure deal or submit a purchase inquiry request to Mo&apos;s dashboard inbox.
              </DialogDescription>
            </DialogHeader>

            <div className="my-4 space-y-4">
              {/* Product Info Section */}
              <div className="bg-dark-1 p-3.5 rounded border border-dark-3/60 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-main flex items-center gap-1.5">
                  <Sparkles className="size-3" /> Key Deliverables & Features:
                </h4>
                <ul className="space-y-1.5 text-xs text-text">
                  {getProjectFeatures(selectedProject).map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="size-3.5 text-main shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Purchase Method 1: WhatsApp (Primary) */}
              <div className="space-y-2">
                <a
                  href={getWhatsAppLink(selectedProject)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold py-3.5 px-4 rounded-lg shadow-md transition duration-300 text-sm cursor-pointer animate-pulse hover:animate-none"
                >
                  <FaWhatsapp className="size-5" />
                  Buy Instantly via WhatsApp Chat
                </a>
                <p className="text-[10px] text-center text-text italic">
                  Opens a direct chat with pre-written request. Secure payment options discussed in chat.
                </p>
              </div>

              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-dark-3"></div>
                <span className="flex-shrink mx-4 text-text text-[10px] uppercase font-mono tracking-widest">or send email inquiry</span>
                <div className="flex-grow border-t border-dark-3"></div>
              </div>

              {/* Purchase Method 2: Contact Form */}
              <form onSubmit={handleFormSubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-text uppercase">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. John Doe"
                      className="w-full text-xs bg-dark-3 border border-dark-3 text-white px-3 py-2.5 outline-none rounded focus:border-main/55 transition"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-text uppercase">Your Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. john@example.com"
                      className="w-full text-xs bg-dark-3 border border-dark-3 text-white px-3 py-2.5 outline-none rounded focus:border-main/55 transition"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-text uppercase">Message / Special Instructions</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full text-xs bg-dark-3 border border-dark-3 text-white px-3 py-2.5 outline-none rounded resize-none focus:border-main/55 transition"
                  />
                </div>

                <Button
                  type="submit"
                  loading={loading}
                  className="w-full bg-main hover:bg-main/80 text-dark-1 font-bold py-3.5 text-xs tracking-widest uppercase flex items-center justify-center gap-1.5 cursor-pointer shadow-md rounded"
                >
                  <Send className="size-3" />
                  Submit Purchase Request
                </Button>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
};

export default ProjectsShop;
