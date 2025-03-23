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
      className="py-4 px-6 mb-8 relative"  
      style={{
        backgroundColor: 'rgb(81, 137, 9)',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
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
        style={{
          display: 'flex',
          alignItems: 'center',
          marginLeft: '260px',
          marginTop: '20px',
        }}
      >
        <div
          className={`text-6xl font-bold ${bubbleboddy.className}`}
          style={{
            color: 'rgb(225, 208, 189)',
          }}
        >
          Wingchi
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginLeft: '50px',
          }}
        >
          <div
            className={`text-3xl font-bold ${agrandirNarrow.className}`}
            style={{
              color: 'white',
              fontStyle: 'italic',
              lineHeight: '1.2',
            }}
          >
            Coding, Writing  and  Shipping
          </div>
           
        </div>
      </div>
      
    </nav>
  );
}