// src/pages/PostsPage.tsx
import SectionHeader from "@/components/shared/section-header";
import { getPosts } from "@/lib/supabase-methods";

export default async function PostsPage() {
    const data = await getPosts(1, 10);
    return (
        <div className="min-h-screen py-8 relative">
            <SectionHeader title="Linkedin Posts" />
            <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {data?.data?.map(post => (
                    <div key={post.id} className="flex h-full w-full justify-center items-center ">
                        <div
                            className="w-full h-82 scroll-wrapper bg-white "
                        >
                            <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7381460374769979392?collapsed=1" height="559" width="504" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>
                        </div>
                    </div>

                ))}
            </div>
        </div>
    );
}
