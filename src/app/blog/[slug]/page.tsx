import { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogGrid } from "@/components/blog/BlogGrid";
import { getPost, getPosts } from "@/lib/wordpress";
import { BlogPost } from "@/types";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) return { title: "Blog Post | Nutrafy" };

  return {
    title: `${post.title.rendered} | Nutrafy`,
    description: post.excerpt.rendered.replace(/<[^>]*>/g, ""),
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post: BlogPost | null = null;
  let related: BlogPost[] = [];

  try {
    post = await getPost(slug);
    if (post) {
      related = (await getPosts({ per_page: 3, categories: post.categories?.[0] })).filter(
        (item) => item.id !== post?.id,
      );
    }
  } catch {
    post = null;
  }

  if (!post) notFound();

  return (
    <article className="space-y-6 rounded-xl border bg-white p-6">
      <h1 className="text-3xl font-semibold" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
      <p className="text-sm text-zinc-500">
        {new Date(post.date).toLocaleDateString()} • {post._embedded?.author?.[0]?.name || "Nutrafy"}
      </p>
      <div className="prose-content text-sm text-zinc-700" dangerouslySetInnerHTML={{ __html: post.content?.rendered || "" }} />
      <div className="flex gap-3 text-sm">
        <button className="rounded-md border px-3 py-1">Share on Facebook</button>
        <button className="rounded-md border px-3 py-1">Share on X</button>
      </div>
      <section>
        <h2 className="mb-3 text-xl font-semibold">Related Posts</h2>
        <BlogGrid posts={related} />
      </section>
    </article>
  );
}
