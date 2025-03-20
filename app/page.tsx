import { Code } from 'lucide-react';
import fs from 'fs/promises'; // Import fs.promises for async file reading
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

// Define the type for a blog post
interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
}

async function getBlogPosts(): Promise<BlogPost[]> {  // Create an async function to fetch blog posts
  const blogsDirectory = path.join(process.cwd(), 'content/blogs');
  const filenames = await fs.readdir(blogsDirectory); // Use await

  const blogs = await Promise.all( // Use Promise.all to await all file readings
    filenames.map(async (filename) => { // Mark the map function as async
      const filePath = path.join(blogsDirectory, filename);
      const fileContents = await fs.readFile(filePath, 'utf8'); // Use await
      const { data, content } = matter(fileContents);

      // 将 Markdown 转换为 HTML
      const html = marked(content);
      return {
        title: data.title ,
        excerpt: data.excerpt || '',
        slug: filename.replace(/\.md$/, ''),
        html,
      };
    })
  );

  return blogs;
}

//Remove interface HomeProps
export default async function Home() {
  const blogs = await getBlogPosts(); // Await the result of getBlogPosts

  return (
    <div className="min-h-screen">
      <section className="mb-20">
        <h2 className="text-2xl mb-8 flex items-center gap-2">
          <Code className="w-6 h-6" style={{ color: 'rgb(225, 208, 189)' }} />
          Latest Posts
        </h2>
        <div>
          {blogs && blogs.map((post) => (
            <div key={post.slug} className="mb-6 border-2 border-black p-4">
              <h3 className="text-lg mb-2">
                <a href={`/blog/${post.slug}`} className="hover:underline">
                  {post.title}
                </a>
              </h3>
              <p className="text-sm" style={{ color: 'rgb(63, 60, 60)' }}>{post.excerpt}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}