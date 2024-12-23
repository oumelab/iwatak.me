import { FC } from 'react';

export type Post = {
  slug: string;
  title: string;
  createdAt: string;
  content: FC;
};