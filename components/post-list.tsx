"use client";
import {useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";
import type {Post} from "@/types/post";
import Link from "next/link";

export default function PostList({
  posts,
  postsPerPage,
}: {
  posts: Omit<Post, "content">[];
  postsPerPage: number;
}) {
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const page = searchParams.get("page") || "1";
    setCurrentPage(parseInt(page));
  }, [searchParams]);

  return (
    <>
      {posts
        ?.filter((_, index) => {
          const startIndex = (currentPage - 1) * postsPerPage;
          const endIndex = startIndex + postsPerPage;
          return index >= startIndex && index < endIndex;
        })
        .map((post) => (
          <li className="relative w-fit" key={post.slug}>
            <div className="flex items-center gap-2">
              <h2 className="text-lg">{post.title}</h2>
              <p>{post.createdAt}</p>
            </div>
            <Link
              href={`/blog/${post.slug}/`}
              className="absolute inset-0"
            ></Link>
          </li>
        ))}
    </>
  );
}
