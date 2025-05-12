
export type Post = {
  slug: string;
  title: string;
  createdAt: string | Date;
  updatedAt?: string | Date;
  content: () => React.ReactNode;
};