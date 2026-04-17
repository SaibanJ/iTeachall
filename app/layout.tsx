import type { Metadata } from 'next';
import { Bricolage_Grotesque } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import Navbar from '@/components/Navbar';

const bricolage = Bricolage_Grotesque({
  variable: '--font-bricolage',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'iTeach',
  description: 'Real-time AI Teaching Platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ variables: { colorPrimary: '#a855f7' } }}>
      <html lang="en">
        <body className={`${bricolage.variable} antialiased`}>
          {/* Animated mesh background */}
          <div className="mesh-bg" aria-hidden="true">
            <div className="orb orb-1" />
            <div className="orb orb-2" />
            <div className="orb orb-3" />
          </div>
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
