import { getPost } from "@/data/post";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const post = await getPost(slug);
  

  return (
    <div className="prose prose-zinc dark:prose-invert max-w-3xl mx-auto">
    {post && (
      <> 
      <h1 className="text-[28px]">{post.title}</h1>
      <p>{post.createdAt}</p>
      <post.content />
      </>
    )}
    </div>
    )
   }