import { FC } from 'react';

export type Post = {
  slug: string;
  title: string;
  createdAt: Date;
  updatedAt?: Date;
  content: FC;
};