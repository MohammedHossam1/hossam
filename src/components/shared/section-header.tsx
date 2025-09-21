import Link from "next/link"

const SectionHeader = ({ title, seeAllLink }: { title: string, seeAllLink?: string }) => {
    return (
        <div className="flex items-center justify-between mb-6 ">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2 relative">
                {title}
            </h2>
            {seeAllLink && <Link href={seeAllLink} className="text-base font-semibold text-main flex items-center gap-2 relative">
                {"See all"}
            </Link>}
        </div>
    )
}

export default SectionHeader