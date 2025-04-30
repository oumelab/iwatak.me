import { Post } from '@/types/post';
import fs from "fs";
import { notFound } from 'next/navigation';
import path from 'path';
import 'server-only';
// import { PostSlugs } from './post-slug';

const postsDirectory = path.join(process.cwd(), "/app/blog");

const getFileNames = (): string[] => {
  const allNames = fs.readdirSync(postsDirectory);
  const fileNames = allNames.filter(name => name.includes(".mdx"));
  return fileNames;
};
// const allNames = fs.readdirSync(postsDirectory);
// const fileNames = allNames.filter(name => name.includes(".mdx"));

// export const getPost = async (slug: string): Promise<Post> => {
//   if (!PostSlugs.includes(slug)) {
//     notFound();
//   }
//   const post = await import(`/app/blog/${slug}.mdx`);

//   const { title, createdAt } = post.metadata;

//   return {
//     slug,
//     title,
//     createdAt,
//     content: post.default,
//   };
// };

// export const getAllPosts = async (): Promise<Post[]> => {
//   return await Promise.all(PostSlugs.map(async (slug) => getPost(slug)));
// };

// export const getPostList = async (): Promise<Omit<Post, 'content'>[]> => {
//   const posts = await Promise.all(PostSlugs.map(async (slug) => {
//     const post = await import(`/app/blog/${slug}.mdx`);
//     const { title, createdAt } = post.metadata;
//     return {
//       slug,
//       title,
//       createdAt,
//     };
//   })
//   );
//   return posts;
// }

export const getPost = async (slug: string): Promise<Post> => {
  const fileNames = getFileNames();
  const postSlugs = fileNames.map(fileName => fileName.replace(/\.mdx$/, ""));
  if (!postSlugs.includes(slug)) {
    notFound();
  }
  const post = await import(`/app/blog/${slug}.mdx`);
  const { title, createdAt } = post.metadata;
  return {
    slug,
    title,
    createdAt,
    content: post.default,
  };
}

export const getAllPosts = async(): Promise<Omit<Post, 'content'>[]> => {
  const fileNames = getFileNames();
  const posts = await Promise.all(fileNames.map(async (fileName) => {
    const post = await import(`/app/blog/${fileName}`);
    const { title, createdAt } = post.metadata;
    return {
      slug: fileName.replace(/\.mdx$/, ""),
      title,
      createdAt,
    };
  })
  );
  return posts;
  
}