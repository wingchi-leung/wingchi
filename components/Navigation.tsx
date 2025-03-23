"use client";
import '../app/globals.css';
export default function Navigation() {
  return (
    <nav
      className="py-4 px-6 mb-8"
      style={{
        backgroundColor: 'rgb(81, 137, 9)',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'relative', // Add relative positioning for animation
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginLeft: '260px',
          marginTop: '20px',
        }}
      >
        <div
          className="text-6xl font-bold"
          style={{
            color: 'rgb(225, 208, 189)',
            fontFamily: 'Bubbleboddy',
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
            className="text-4xl font-bold"
            style={{
              color: 'white',
              fontFamily: 'AgrandirNarrow',
              fontStyle: 'italic',
              lineHeight: '1.2',
            }}
          >
            coding,
          </div>
          <div
            className="text-4xl font-bold"
            style={{
              color: 'white',
              fontFamily: 'AgrandirNarrow',
              fontStyle: 'italic',
              lineHeight: '1.2',
            }}
          >
            building,
          </div>
          <div
            className="text-4xl font-bold"
            style={{
              color: 'white',
              fontFamily: 'AgrandirNarrow',
              fontStyle: 'italic',
              lineHeight: '1.2',
            }}
          >
            shipping
          </div>
        </div>
      </div>
      <img
        src="/bigjump.jpg" // 替换为你的图片路径
        alt="Profile"
        style={{
          width: '100px', // 调整图片大小
          height: '100px', // 调整图片大小
          borderRadius: '50%', // 设置为圆形
          marginLeft: 'auto', // 将图片推到最右边
          marginRight: '20px', // 调整右边距
          animation: 'rotate 50s linear infinite', // 添加旋转动画
          animationDelay: '0s', // 添加 animation-delay 属性

        }}
      />
      <style global jsx>{`
        @font-face {
          font-family: 'Bubbleboddy';
          src: url('/fonts/Bubbleboddy-Neue-Extrabold-Inline-trial.ttf') format('truetype');
          font-weight: normal;
          font-style: normal;
        }
        @font-face {
          font-family: 'AgrandirNarrow';
          src: url('/fonts/agrandir-narrow.otf') format('opentype');
          font-weight: normal;
          font-style: normal;
        }
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </nav>
  );
}