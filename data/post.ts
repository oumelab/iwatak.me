import 'server-only';
import { Post } from '@/types/post';
import { PostSchema } from './post-schema';
import { notFound } from 'next/navigation';

export const getPost = async (id: string): Promise<Post> => {
  if (!PostSchema.includes(id)) {
    notFound();
  }
  const post = await import(`/app/blog/${id}.mdx`);

  const { title, createdAt } = post.metadata;

  return {
    id,
    title,
    createdAt,
    content: post.default,
  };
};

export const getAllPosts = async (): Promise<Post[]> => {
  return await Promise.all(PostSchema.map(async (id) => getPost(id)));
};