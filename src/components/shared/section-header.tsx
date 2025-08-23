
const SectionHeader = ({ title }: { title: string }) => {
    return (
        <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2 relative">
            {title}
        </h2>
    )
}

export default SectionHeader