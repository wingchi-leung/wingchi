import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import ReactMarkdown from 'react-markdown'

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
    const html = await marked(content); // Await the marked function here

    return {
      title: data.title || 'No Title',
      html: html,
    };
  } catch (error) {
    console.error(`Error reading or parsing blog post ${slug}:`, error);
    return null; // Or throw the error, or return a default object
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
    return <div>Blog post not found</div>; // Or a custom 404 page
  }

  return (
    <div className="container mx-auto py-8">
      {/* <h1 className="text-3xl font-bold mb-4">{post.title}</h1> */}
      <head>
        <title>Demo Blog | {post.title}</title>
      </head>
      
      <hr />
      <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
      {/* <ReactMarkdown> */}
        {/* {post.html} */}
      {/* </ReactMarkdown> */}
    </div>
  );
}