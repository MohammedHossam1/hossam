import Videos from "@/components/layout/videos"
import SectionHeader from "@/components/shared/section-header";
import { getVideos } from "@/lib/supabase-methods";
import Loading from "@/app/loading";
import { Suspense } from "react";

const VideosPage =  () => {
  const videosPromise = getVideos(1, 10);

  return (
    <section className="relative py-3 lg:py-10 min-h-[calc(100dvh-70px)] lg:min-h-[calc(100dvh-30px)]">
      <div className="flex items-center justify-between">
        <SectionHeader title="Videos" />
      </div>
      <Suspense fallback={<Loading />}> 
        <Videos data={videosPromise} />
      </Suspense>
    </section>
  )
}

export default VideosPage