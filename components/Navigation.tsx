"use client";

import '../app/globals.css';
import localFont from 'next/font/local'

const bubbleboddy = localFont({
  src: '../public/fonts/bubble-inlie.ttf',
  display: 'swap',
})

const agrandirNarrow = localFont({
  src: '../public/fonts/agrandir-narrow.otf',
  display: 'swap',
})

export default function Navigation() {
  return (
    <nav
      className="py-4 px-4 md:px-6 mb-8 relative"  
      style={{
        backgroundColor: 'rgb(250,249,245)',
      }}
    >
      {/* <img
        src="/bigjump.jpg" // 替换为你的图片路径
        alt="Profile"
        style={{
          width: '100px', // 调整图片大小
          height: '100px', // 调整图片大小
          borderRadius: '50%', // 设置为圆形
          marginLeft: '20px',  
          marginRight: '20px', 
          animation: 'rotate 50s linear infinite', // 添加旋转动画
          animationDelay: '0s', // 添加 animation-delay 属性

        }}
      /> */}
      <div
        className="flex flex-col items-center md:flex-row md:justify-center w-full"
      >
        <div
          className={`text-4xl md:text-6xl font-bold text-center mb-4 md:mb-0 ${bubbleboddy.className}`}
          style={{
            color: 'rgb(171, 155, 137)',

          }}
        >
          Wingchi
        </div>
        <div
          className="flex flex-col items-center md:items-start md:ml-8"
        >
          <div
            className={`text-xl md:text-3xl font-bold text-center md:text-left ${agrandirNarrow.className}`}
            style={{
              color: 'rgb(171, 155, 137)',
              fontStyle: 'italic',
              lineHeight: '1.2',
            }}
          >
            Coding, Writing and Shipping
          </div>
        </div>
      </div>
      
    </nav>
  );
}