import { getPost } from "@/data/post";
import { format, parse } from "date-fns";
import { ja } from "date-fns/locale";

export const generateMetadata = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;
  const post = await getPost(slug);
  return {
    title: post?.title,
  };
};

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const post = await getPost(slug);

  const ensureDate = (dateValue: string | Date) => {
    if (typeof dateValue === "string") {
    return parse(dateValue, "yyyy-MM-dd", new Date());
    }
    return dateValue;
  };
  

  return (
    <div className="prose prose-zinc max-w-3xl mx-auto">
    {post && (
      <> 
      <h1 className="text-[28px]">{post.title}</h1>
      <p>投稿日 {format(ensureDate(post.createdAt), "yyyy年MM月dd日", { locale: ja })}</p>
      <post.content />
      </>
    )}
    </div>
    )
   }