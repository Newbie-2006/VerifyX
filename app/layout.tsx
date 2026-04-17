import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'VerifyX | Premium Return Management',
  description: 'AI-powered return verification for fashion brands.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className="bg-[#f2f2f7] text-[#1d1d1f] min-h-screen font-sans">
        {children}
      </body>
    </html>
  );
}
