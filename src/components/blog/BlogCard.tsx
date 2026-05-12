import Image from "next/image";
import Link from "next/link";

import { BlogPost } from "@/types";
import { stripHtml } from "@/lib/utils";

export function BlogCard({ post }: { post: BlogPost }) {
  const image = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  return (
    <article className="rounded-lg border bg-white p-3">
      {image ? (
        <Image src={image} alt={post.title.rendered} width={600} height={300} className="h-44 w-full rounded-md object-cover" />
      ) : null}
      <h3 className="mt-3 line-clamp-2 text-lg font-semibold">
        <Link href={`/blog/${post.slug}`}>{post.title.rendered}</Link>
      </h3>
      <p className="mt-2 line-clamp-3 text-sm text-zinc-600">{stripHtml(post.excerpt.rendered)}</p>
      <p className="mt-2 text-xs text-zinc-500">{new Date(post.date).toLocaleDateString()}</p>
    </article>
  );
}
