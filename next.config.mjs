// import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from 'remark-gfm';

/** @type {import('rehype-pretty-code').Options} */
const options = {
  // See Options section below.
  theme: {
    dark: 'github-dark',
    light: 'github-light',
  },
  keepBackground: true,
  filterMetaString: (string) => string.replace(/filename="[^"]*"/, ""),
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [[rehypePrettyCode, options,],],
  },
})

export default withMDX(nextConfig)