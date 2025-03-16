import { getPostList } from "@/data/post";
import Pagination from "@/components/pagination";
import PostList from "@/components/post-list";

export default async function Page() {
  const posts = await getPostList();
  const postsPerPage = 3;
 
  return (
    <div className="max-w-[580px] mx-auto py-2">
      <h1 className="font-bold text-2xl">Blog</h1>

      <ul className="my-10 pl-4 space-y-2 list-disc">
        <PostList posts={posts} postsPerPage={postsPerPage} />
      </ul>
      <Pagination totalPosts={posts.length} defaultPostsPerPage={postsPerPage} delta={2} />
    </div>
  )
}