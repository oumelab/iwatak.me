import "server-only";
import {Post} from "@/types/post";
import fs from "fs";
import {notFound} from "next/navigation";
import path from "path";
import { compareDesc } from "date-fns";


// 投稿ディレクトリのパス
const postsDirectory = path.join(process.cwd(), "/app/blog");

// 投稿ディレクトリからファイル名を取得する
const getFileNames = (): string[] => {
  try {
    const allNames = fs.readdirSync(postsDirectory);

    const fileNames = allNames.filter((name) => name.endsWith(".mdx"));
    return fileNames;
  } catch (error) {
    console.error("記事の取得に失敗しました:", error);
    return [];
  }
};

// 記事メタデータを取得
const getPostMetadata = async (
  fileName: string
): Promise<Omit<Post, "content">> => {
  try {
    const post = await import(`/app/blog/${fileName}`);
    const {title, createdAt} = post.metadata;
    return {
      slug: fileName.replace(/\.mdx$/, ""),
      title,
      createdAt,
    };
  } catch (error) {
    console.error(`記事ファイル "${fileName}" のメタデータ取得に失敗しました:`, error);
    throw error;
  }
};

// 記事詳細を取得
export const getPost = async (slug: string): Promise<Post> => {
  try {
    const fileNames = getFileNames();
    const postSlugs = fileNames.map((fileName) =>
      fileName.replace(/\.mdx$/, "")
    );
    if (!postSlugs.includes(slug)) {
      notFound();
    }
    const fileName = `${slug}.mdx`;
    const metadata = await getPostMetadata(fileName);
    const post = await import(`/app/blog/${fileName}`);

    return {
      ...metadata,
      content: post.default as () => React.ReactNode,
    };
  } catch (error) {
    console.error(`記事 "${slug}" の取得に失敗しました:`, error);
    notFound();
  }
};

// 投稿一覧を取得
export const getAllPosts = async (): Promise<Omit<Post, "content">[]> => {
  try {
    const fileNames = getFileNames();
    const posts = await Promise.all(
      fileNames.map(async (fileName) => getPostMetadata(fileName))
    );
    // 投稿日の降順にソート
    const sortedPosts = posts.sort((a, b) => {
      return compareDesc(a.createdAt, b.createdAt);
    });
    return sortedPosts;
  } catch (error) {
    console.error("記事一覧の取得に失敗しました:", error);
    return [];
  }
};
