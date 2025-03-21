import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
 

interface BlogPostProps {
  params: {
    slug: string;
  };
}

async function getBlogPost(slug: string): Promise<{ title: string; html: string; } | null> {
  const blogsDirectory = path.join(process.cwd(), 'content/blogs');
  const filePath = path.join(blogsDirectory, `${slug}.md`);

  try {
    const fileContents = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    // Ensure marked is used correctly
    const html = await marked(content);

    return {
      title: data.title || 'No Title',
      html: html,
    };
  } catch (error) {
    console.error(`Error reading or parsing blog post ${slug}:`, error);
    return null;
  }
}

export async function generateStaticParams() {
  const blogsDirectory = path.join(process.cwd(), 'content/blogs');
  const filenames = await fs.readdir(blogsDirectory);

  return filenames.map(filename => ({
    slug: filename.replace(/\.md$/, ''),
  }));
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = params;
  const post = await getBlogPost(slug);

 
  if (!post) {
    return <div>Blog post not found</div>;
  }

  return (
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.html }} />
  );
}