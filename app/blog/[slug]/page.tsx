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
    <div className="px-4 md:px-8 lg:px-16 max-w-screen-lg mx-auto">
      <article className="my-8">
        <h1 className="text-2xl md:text-4xl font-bold mb-6">{post.title}</h1>
        <div 
          className="prose prose-sm md:prose-base lg:prose-lg max-w-none
          prose-headings:font-bold
          prose-p:text-gray-800 
          prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
          prose-img:rounded-lg prose-img:mx-auto prose-img:max-w-full prose-img:h-auto"
          dangerouslySetInnerHTML={{ __html: post.html }} 
        />
        <div className="h-10"></div>
      </article>
     </div>
  );
}