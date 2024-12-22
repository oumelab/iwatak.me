import { FC } from 'react';

export type Post = {
  id: string;
  title: string;
  createdAt: string;
  content: FC;
};