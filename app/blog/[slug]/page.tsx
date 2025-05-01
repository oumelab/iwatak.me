import { getPost } from "@/data/post";
import { format } from "date-fns";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const post = await getPost(slug);
  

  return (
    <div className="prose prose-zinc dark:prose-invert max-w-3xl mx-auto">
    {post && (
      <> 
      <h1 className="text-[28px]">{post.title}</h1>
      <p>投稿日 {format(post.createdAt, "yyyy/MM/dd")}</p>
      <post.content />
      </>
    )}
    </div>
    )
   }