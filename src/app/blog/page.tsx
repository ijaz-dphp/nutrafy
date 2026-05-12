import { Metadata } from "next";

import { BlogGrid } from "@/components/blog/BlogGrid";
import { Input } from "@/components/ui/Input";
import { getPosts } from "@/lib/wordpress";
import { BlogPost } from "@/types";

export const metadata: Metadata = {
  title: "Blog | Nutrafy",
  description: "Read wellness articles and health insights.",
};

export const revalidate = 60;

async function loadPosts() {
  try {
    return await getPosts({ per_page: 12 });
  } catch {
    return [] as BlogPost[];
  }
}

export default async function BlogPage() {
  const posts = await loadPosts();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Blog</h1>
      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <BlogGrid posts={posts} />
        <aside className="space-y-4 rounded-lg border bg-white p-4">
          <h2 className="font-semibold">Search Articles</h2>
          <Input placeholder="Search..." />
          <h3 className="font-semibold">Recent Posts</h3>
          <ul className="space-y-2 text-sm text-zinc-600">
            {posts.slice(0, 5).map((post) => (
              <li key={post.id}>{post.title.rendered}</li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
