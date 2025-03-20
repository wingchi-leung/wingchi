"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="py-4 px-6 mb-8 text-center" style={{ backgroundColor: 'rgb(92, 225, 233)' }}>
      <div className="container mx-auto flex justify-between items-center">
        

        {/* Mobile menu button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>

        {/* Navigation links */}
        <div className={`${isOpen ? 'block' : 'hidden'} md:block absolute md:relative top-16 md:top-0 left-0 right-0 md:flex bg-white md:bg-transparent p-4 md:p-0 shadow-lg md:shadow-none `}>
          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          <Link
          href="/"
          className="text-4xl font-bold  text-center" // 增大字体
          style={{
            color: 'white', 
            fontFamily: 'Bubbleboddy',  
          }}
        >
          Wingchi
        </Link>
            <Link href="/blog" className="nav-link">
              Blog
            </Link>
          </div>
        </div>
      </div>
      <style global jsx>{`
        @font-face {
          font-family: 'Bubbleboddy';
          src: url('/fonts/Bubbleboddy-Neue-Extrabold-Inline-trial.ttf') format('truetype'); /* 确保路径正确 */
          font-weight: normal;
          font-style: normal;
        }
      `}</style>
    </nav>
  );
}