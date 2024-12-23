import { getPost } from "@/data/post";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const post = await getPost(slug);
  

  return (
    <div className="prose dark:prose-invert">
    {post && (
      <> 
      <h1>{post.title}</h1>
      <p>{post.createdAt}</p>
      <post.content />
      </>
    )}
    </div>
    )
   }