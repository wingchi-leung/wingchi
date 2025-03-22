import './globals.css';
import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';

export const metadata: Metadata = {
  title: "Casey的个人网站",
  description: 'Personal website and blog   ',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body>
      <Navigation />
        <main className="container mx-auto ">
          {children}
        </main>
      </body>
    </html>
  );
}