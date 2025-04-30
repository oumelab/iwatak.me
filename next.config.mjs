// import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import remarkGfm from 'remark-gfm';
import rehypePrettyCode from "rehype-pretty-code";

/** @type {import('rehype-pretty-code').Options} */
const options = {
  // See Options section below.
  theme: 'github-dark',
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