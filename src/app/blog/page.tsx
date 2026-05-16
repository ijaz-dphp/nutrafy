import { Metadata } from "next";
import Link from "next/link";

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

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedSearchParams = await searchParams;
  const query =
    typeof resolvedSearchParams.search === "string"
      ? resolvedSearchParams.search.trim().toLowerCase()
      : "";
  const posts = await loadPosts();
  const filteredPosts = query
    ? posts.filter((post) => post.title.rendered.toLowerCase().includes(query))
    : posts;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Blog</h1>
      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <BlogGrid posts={filteredPosts} />
        <aside className="space-y-4 rounded-lg border bg-white p-4">
          <h2 className="font-semibold">Search Articles</h2>
          <form action="/blog" className="space-y-2">
            <Input name="search" placeholder="Search..." defaultValue={query} />
            <button type="submit" className="min-h-10 rounded-md bg-zinc-900 px-4 text-sm text-white">
              Search
            </button>
          </form>
          {query ? (
            <Link href="/blog" className="block text-sm text-zinc-600 underline">
              Clear search
            </Link>
          ) : null}
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
