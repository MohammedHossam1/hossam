import SectionHeader from "../../shared/section-header";
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
const ExperienceCard = ({ title, role, data, description }: Item) => {
    return (
        <div
            className="relative bg-card border border-neutral-800 p-4 shadow-sm me-4 py-7 cursor-pointer"
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

    return (
        <div className="">
            <SectionHeader title={title} />
            <div className="relative pe-6">
                <div className="absolute end-3 top-2 bottom-2 w-1 bg-dark-1" />

                <div className="space-y-8">
                    {items.map((item, idx) => (
                        <div key={item.title + idx} className="relative group">
                            {/* Original Dot */}
                            <span className="absolute -end-[18px] top-2 h-3.5 w-3.5 rounded-full border-3 border-main ring-4 ring-neutral-900 z-10" />

                            {/* Pulse Dot */}
                            <span
                                className="absolute hidden group-hover:block  -end-[18px] top-2 h-3.5 w-3.5 animate-ping rounded-full border-2 border-main bg-main/30"
                            />

                            <ExperienceCard
                                {...item}
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
        title: "Mansoura University",
        role: "BCom, Commerce",
        data: "2016 – 2020",
        description: "Graduated with a Bachelor of Commerce degree from Mansoura University.",
    },
    {
        title: "Route Academy",
        role: "Fundamentals of Programming",
        data: "2022",
        description: "Completed the Fundamentals of Programming course at Route Academy.",
    },
    {
        title: "Route Academy",
        role: "Frontend Development",
        data: "2022",
        description: "Completed the Frontend Development course at Route Academy (React, TypeScript, UI/UX).",
    },
    {
        title: "Route Academy",
        role: "Backend Development (.NET)",
        data: "2023 – 2024",
        description: "Completed the Backend Development course at Route Academy (C#, .NET, Databases).",
    },
];


const WORK: Item[] = [
    {
        title: "Serv5",
        role: "Frontend Developer (Past)",
        data: "2024 – 2025/9",
        description:
            "Built responsive dashboards and landing pages, shipped design systems, and collaborated with backend teams.",
    },
    {
        title: "Qadi-Tech",
        role: "Frontend Developer (Part-time)",
        data: "2025 – Present",
        description:
            "Working part-time on React projects, contributing to UI components, and optimizing web performance.",
    },
    {
        title: "Freelance Projects",
        role: "Frontend Engineer",
        data: "2025 – Present",
        description:
            "Delivered two independent freelance projects, focusing on React apps, micro-frontends, and clean UI/UX design.",
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
    console.log("work");
    return (
        <main className="">
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4  xl:gap-10">
                <TimelineColumn title="Work History" items={work} />
                <TimelineColumn title="Education" items={education} />
            </section>
        </main>
    );
}

