'use client'
const DownloadCV = ({ data }: { data: any }) => {
    const handleDownload = async () => {
        if (!data || data?.data.length === 0) return;
        try {
            const response = await fetch(data?.data[data?.data.length - 1].name);
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
        <div>
            {!data || data?.data?.length == 0 ? null :
                <button
                    onClick={handleDownload}
                    className="text-text cursor-pointer text-[13px] hover:bg-transparent hover:text-main bg-transparent font-medium text-start w-fit p-0 m-0 tracking-wider"
                >
                    DOWNLOAD CV ⬇
                </button>
            }
        </div>
    )
}

export default DownloadCV