import 'server-only';
import { Post } from '@/types/post';
import { PostSlugs } from './post-slug';
import { notFound } from 'next/navigation';

export const getPost = async (slug: string): Promise<Post> => {
  if (!PostSlugs.includes(slug)) {
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
};

export const getAllPosts = async (): Promise<Post[]> => {
  return await Promise.all(PostSlugs.map(async (slug) => getPost(slug)));
};

export const getPostList = async (): Promise<Omit<Post, 'content'>[]> => {
  const posts = await Promise.all(PostSlugs.map(async (slug) => {
    const post = await import(`/app/blog/${slug}.mdx`);
    const { title, createdAt } = post.metadata;
    return {
      slug,
      title,
      createdAt,
    };
  })
  );
  return posts;
}