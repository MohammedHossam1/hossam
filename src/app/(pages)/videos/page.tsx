import Videos from "@/components/layout/videos"
import { getVideos } from "@/lib/supabase-methods";

const VideosPage = async () => {
  const { data } = await getVideos(1, 10);

  return (
    <section className="relative flex items-center justify-center  min-h-[calc(100dvh-70px)] lg:min-h-[calc(100dvh-30px)]">
      <Videos data={data} />
    </section>
  )
}

export default VideosPage