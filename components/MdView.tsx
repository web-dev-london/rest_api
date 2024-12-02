import React from 'react';
import { promises as fs } from "fs";
import path from "path";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { compileMDX } from 'next-mdx-remote/rsc';

const MdView = async () => {
  // Load the markdown content
  const content = await fs.readFile(
    path.join(process.cwd(), 'md', 'endpoints.md'),
    'utf-8'
  );

  // Compile MDX content with plugins for styling and highlighting
  const { content: renderedContent } = await compileMDX({
    source: content,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],         // Enable GitHub-flavored Markdown extensions
        rehypePlugins: [rehypeHighlight],   // Syntax highlighting for code blocks
      },
    },
    components: {
      // Define custom components if needed (e.g., specific heading styles or code block customizations)
    },
  });

  return (
    <article
      className="prose max-w-5xl mx-auto overflow-hidden whitespace-wrap
        text-base md:text-[18px] leading-loose px-4
      "
    >
      {renderedContent}
    </article>
  );
};

export default MdView;