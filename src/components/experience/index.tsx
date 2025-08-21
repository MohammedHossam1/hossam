'use client';
import { useState } from "react";
// -----------------------------
// Types
// -----------------------------

interface Item {
    title: string;
    role: string;
    data: string;
    description: string;
    onHover?: (hovered: boolean) => void;
}

// -----------------------------
// Card (kept very close to your original API)
// -----------------------------
const ExperienceCard = ({ title, role, data, description, onHover }: Item) => {
    return (
        <div
            className="relative bg-card border border-neutral-800 p-4 shadow-sm me-4 py-7 cursor-pointer"
            onMouseEnter={() => onHover?.(true)}
            onMouseLeave={() => onHover?.(false)}
        >
            <div className="absolute -end-2 top-1 h-0 w-0 border-t-10 border-b-10 border-s-10 border-t-transparent border-b-transparent border-s-card bg-transparent" />

            <div className="flex items-start justify-between gap-4">
                <div>
                    <h3 className="text-white text-sm font-semibold tracking-wider leading-tight mb-3">{title}</h3>
                    <p className="text-text/50 text-xs italic">{role}</p>
                </div>
                <span className="shrink-0 text-xs px-2.5 py-1 rounded-full bg-dark-1/80 text-text/50">
                    {data}
                </span>
            </div>
            <p className="text-text text-sm mt-3 leading-relaxed font-light">{description}</p>
        </div>
    );
};


// -----------------------------
// Timeline Column
// -----------------------------
const TimelineColumn = ({ title, items }: { title: string; items: Item[] }) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div className="">
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                {title}
            </h2>
            <div className="relative pe-6">
                <div className="absolute end-3 top-2 bottom-2 w-1 bg-dark-1" />

                <div className="space-y-8">
                    {items.map((item, idx) => (
                        <div key={item.title + idx} className="relative">
                            {/* Original Dot */}
                            <span className="absolute -end-[18px] top-2 h-3.5 w-3.5 rounded-full border-3 border-main ring-4 ring-neutral-900 z-10" />

                            {/* Pulse Dot */}
                            {hoveredIndex === idx && (
                                <span
                                    className="absolute -end-[18px] top-2 h-3.5 w-3.5 animate-ping rounded-full border-2 border-main bg-main/30"
                                />
                            )}


                            <ExperienceCard
                                {...item}
                                onHover={(isHovered) => setHoveredIndex(isHovered ? idx : null)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// -----------------------------
// Demo data — replace with your real data
// -----------------------------
const EDUCATION: Item[] = [
    {
        title: "Al-Azhar University",
        role: "BA, History (Humanities)",
        data: "2019 – 2023",
        description:
            "Studied modern & medieval Middle Eastern history. Led a student club and organized two exhibitions.",
    },
    {
        title: "Self‑Learning",
        role: "Frontend Development",
        data: "2018 – Present",
        description:
            "Focused on React, TypeScript, Tailwind, Motion, and UI/UX best practices.",
    },
];

const WORK: Item[] = [
    {
        title: "Serv5",
        role: "Frontend Developer (Past)",
        data: "2023 – 2024",
        description:
            "Built responsive dashboards and landing pages, shipped design systems, and collaborated with backend teams.",
    },
    {
        title: "Freelance",
        role: "Frontend Engineer",
        data: "2024 – Present",
        description:
            "Delivering React apps, micro‑frontends, and UI kits. Focus on performance, accessibility, and clean DX.",
    },
];

// -----------------------------
// Main Component — split page into two columns
// -----------------------------
export default function ExperienceTimeline({
    education = EDUCATION,
    work = WORK,
}: {
    education?: Item[];
    work?: Item[];
}) {
    return (
        <main className="mx-auto max-w-6xl  lg:py-12">
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4  xl:gap-10">
                <TimelineColumn title="Education" items={education} />
                <TimelineColumn title="Work History" items={work} />
            </section>
        </main>
    );
}

// -----------------------------
// Usage
// -----------------------------
// import ExperienceTimeline from "./ExperienceTimeline";
// <ExperienceTimeline education={yourEducationItems} work={yourWorkItems} />
