import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import React from 'react';
import ConvexClientProvider from '@/providers/ConvexClientProvider';
import {TooltipProvider} from '@/components/ui/tooltip';
import {ThemeProvider} from '@/components/theme/theme-provider';
import {Toaster} from '@/components/ui/sonner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'ChatApp',
  description: 'Realtime chat application using next JS',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" suppressHydrationWarning>
      <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
          <ConvexClientProvider>
            <TooltipProvider>
              {children}
            </TooltipProvider>
            <Toaster richColors/>
          </ConvexClientProvider>
        </ThemeProvider>
      </body>
      </html>
  );
}