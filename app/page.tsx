import { TowerControl as GameController, Code, Camera } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="py-20 text-center pixel-border mb-20">
        <div className="relative w-48 h-48 mx-auto mb-8 pixel-corners overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=300&h=300&auto=format&fit=crop"
            alt="Profile"
            fill
            className="object-cover"
          />
        </div>
        <h1 className="text-4xl mb-6" style={{ color: 'rgb(84, 35, 266)' }}>
          Player One
        </h1>
        <p className="text-lg mb-8" style={{ color: 'rgb(0, 255, 224)' }}>
          Level 99 Developer | Quest Master | Bug Slayer
        </p>
      </section>

      <section className="mb-20">
        <h2 className="text-2xl mb-8 flex items-center gap-2">
          <GameController className="w-6 h-6" style={{ color: 'rgb(84, 35, 266)' }} />
          Skills & Achievements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {['Frontend Master', 'Backend Warrior', 'UI/UX Wizard'].map((skill) => (
            <div key={skill} className="p-6 pixel-border">
              <h3 className="text-xl mb-4" style={{ color: 'rgb(0, 255, 224)' }}>{skill}</h3>
              <div className="h-2 bg-gray-200 pixel-corners">
                <div className="h-full pixel-corners" style={{ width: '85%', backgroundColor: 'rgb(84, 35, 266)' }}></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-20">
        <h2 className="text-2xl mb-8 flex items-center gap-2">
          <Code className="w-6 h-6" style={{ color: 'rgb(84, 35, 266)' }} />
          Latest Projects
        </h2>
        <div className="gallery-grid">
          {[1, 2, 3].map((project) => (
            <div key={project} className="gallery-item pixel-border p-4">
              <div className="aspect-video relative mb-4 pixel-corners overflow-hidden">
                <Image
                  src={`https://images.unsplash.com/photo-156860247112${project}-7832951cc4c5?q=80&w=400&auto=format`}
                  alt={`Project ${project}`}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg mb-2" style={{ color: 'rgb(0, 255, 224)' }}>Project Title {project}</h3>
              <p className="text-sm">A brief description of the project goes here.</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl mb-8 flex items-center gap-2">
          <Camera className="w-6 h-6" style={{ color: 'rgb(84, 35, 266)' }} />
          Photo Gallery
        </h2>
        <div className="gallery-grid">
          {[1, 2, 3, 4].map((photo) => (
            <div key={photo} className="gallery-item pixel-border overflow-hidden">
              <div className="aspect-square relative pixel-corners">
                <Image
                  src={`https://images.unsplash.com/photo-156860247112${photo}-7832951cc4c5?q=80&w=300&auto=format`}
                  alt={`Gallery Photo ${photo}`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}