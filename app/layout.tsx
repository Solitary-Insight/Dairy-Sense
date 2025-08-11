
import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/hooks/useLanguage';

export const metadata: Metadata = {
  title: 'Dairy Sense',
  description:
    'Dairy Sense is an intelligent farm management platform designed specifically for modern dairy farms. It blends IoT sensor technology, AI-based analytics, and easy-to-use interfaces to help farm owners monitor, manage, and optimize their dairy operations in real-time.',
  generator: 'solitary-insight',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
