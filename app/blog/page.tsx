import { Calendar } from 'lucide-react';

export default function Blog() {
  const posts = [
    {
      id: 1,
      title: "My Journey in Game Development",
      date: "2024-03-20",
      excerpt: "How I started my adventure in the world of game development...",
      image: "https://images.unsplash.com/photo-1556438064-2d7646166914?q=80&w=500&auto=format"
    },
    {
      id: 2,
      title: "Creating Pixel Art for Games",
      date: "2024-03-15",
      excerpt: "Tips and tricks for creating engaging pixel art...",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=500&auto=format"
    },
    {
      id: 3,
      title: "The Future of Web Development",
      date: "2024-03-10",
      excerpt: "Exploring upcoming trends in web development...",
      image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=500&auto=format"
    }
  ];

  return (
    <div className="min-h-screen">
      <h1 className="text-4xl mb-12 text-center" style={{ color: 'rgb(84, 35, 266)' }}>
        Developer's Log
      </h1>
      
      <div className="grid gap-8">
        {posts.map(post => (
          <article key={post.id} className="pixel-border p-6">
            <div className="md:grid md:grid-cols-3 gap-6">
              <div className="relative h-48 md:h-full pixel-corners overflow-hidden mb-4 md:mb-0">
                <img
                  src={post.image}
                  alt={post.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="md:col-span-2">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4" style={{ color: 'rgb(0, 255, 224)' }} />
                  <time className="text-sm" style={{ color: 'rgb(0, 255, 224)' }}>{post.date}</time>
                </div>
                <h2 className="text-2xl mb-4" style={{ color: 'rgb(84, 35, 266)' }}>{post.title}</h2>
                <p className="mb-4">{post.excerpt}</p>
                <button className="pixel-border px-4 py-2 hover:bg-opacity-90 transition-all"
                  style={{ backgroundColor: 'rgb(84, 35, 266)', color: 'white' }}>
                  Read More
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}