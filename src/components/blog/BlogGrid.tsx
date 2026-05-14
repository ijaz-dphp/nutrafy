import { BlogPost } from "@/types";

import { BlogCard } from "@/components/blog/BlogCard";

export function BlogGrid({ posts }: { posts: BlogPost[] }) {
  if (!posts.length) {
    return <p className="text-sm text-zinc-600">No posts available.</p>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}
