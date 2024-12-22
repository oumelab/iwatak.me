import { getPost } from "@/data/post";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const post = await getPost(id);
  

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