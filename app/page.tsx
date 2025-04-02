import { Code } from 'lucide-react';
import fs from 'fs/promises'; // Import fs.promises for async file reading
import path from 'path';
import matter from 'gray-matter';
 

// Define the type for a blog post
interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date:string ; 

}

async function getBlogPosts(): Promise<BlogPost[]> {  // Create an async function to fetch blog posts
  const blogsDirectory = path.join(process.cwd(), 'content/blogs');
  const filenames = await fs.readdir(blogsDirectory); // Use await

  const blogs = await Promise.all( // Use Promise.all to await all file readings
    filenames.map(async (filename) => { // Mark the map function as async
      const filePath = path.join(blogsDirectory, filename);
      const fileContents = await fs.readFile(filePath, 'utf8'); // Use await
      const { data } = matter(fileContents);

      // 将 Markdown 转换为 HTML
      return {
        title: data.title,
        excerpt: data.excerpt || '',
        slug: filename.replace(/\.md$/, ''),
        date : data.date 

      };
    })
  );

    // 根据日期排序（降序）
    blogs.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime(); // 降序排序
    });

  return blogs;
}

 
export default async function Home() {
  const blogs = await getBlogPosts();

  return (
    <div className="min-h-screen px-4 md:px-8 lg:px-16 max-w-screen-xl mx-auto">
      <section className="mb-20">
        <div className="grid gap-6">
          {blogs && blogs.map((post) => (
            <div 
              key={post.slug} 
              className="border-2 border-black rounded-lg p-4 md:p-6 
                hover:shadow-lg transition-shadow duration-200
                bg-white"
            >
              <h3 className="text-xl md:text-2xl font-semibold mb-2 md:mb-3">
                <a 
                  href={`/blog/${post.slug}`} 
                  className="hover:underline hover:text-blue-600 transition-colors duration-200"
                >
                  {post.title}
                </a>
              </h3>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                {post.excerpt}
              </p>
            </div>
          ))}
        </div>
      </section>

    
       {/* <section className="mb-20">
        <h2 className="text-2xl md:text-3xl mb-8 flex items-center gap-2">
          <Code className="w-6 h-6 md:w-8 md:h-8" style={{ color: 'rgb(99, 99, 99)' }} />
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <a href="https://pixel-earth.pages.dev/game" 
             className="block hover:transform hover:scale-105 transition-transform duration-200"
             target="_blank" 
             rel="noopener noreferrer"
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="aspect-video relative">
                <Image
                  src="asset/pixel-earth.gif"
                  alt="Pixel Earth"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-800">
                  Pixel Earth
                </h3>
                <p className="text-sm md:text-base text-gray-600">
                  用Blender+enable3d做了个地球
                </p>
              </div>
            </div>
          </a>
          
 
        </div> */}
      {/* </section>   */}
    </div>
  );
}