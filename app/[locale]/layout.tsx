'use client';

import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../lib/i18n';
import 'antd/dist/reset.css';
import Header from '@/components/common/Header';

import { Layout as AntLayout, Col, Row, theme } from 'antd';
import { useEffect, useState } from 'react';
import CustomFooter from '@/components/common/Footer';
import { usePathname, useRouter } from 'next/navigation';
import { ThemeProvider } from '@/components/common/ThemeProviders';
import ThemeSwitcher from '@/components/common/ThemeSwitcher';
import LanguageSwitcher from '@/components/common/LanguageSwitcher';
import { MessageProvider } from '@/components/common/MessageProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentTheme = localStorage.getItem('theme') as 'light' | 'dark';

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname === '/') {
      router.replace('/en');
    }
  }, [pathname, router]);

  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          backgroundColor: currentTheme === 'light' ? '#ffffff' : '#1f1f1f',
        }}>
        {/* Ant Design ConfigProvider for Light/Dark Theme */}
        <ThemeProvider>
          <I18nextProvider i18n={i18n}>
            <MessageProvider>
              <AntLayout style={{ minHeight: 'auto' }}>
                {/* Fixed Header */}
                <Header />

                {/* Content Wrapper */}
                <AntLayout.Content
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    minHeight: 'auto',
                    position: 'relative',
                    top: '-68px',
                  }}>
                  {children}
                </AntLayout.Content>

                {/* Footer */}
                {/* <AntLayout.Footer
                style={{
                  textAlign: 'center',
                  backgroundColor:
                    currentTheme === 'light' ? '#ffffff' : '#1f1f1f',
                  padding: '16px 0',
                }}> */}
                <CustomFooter />
                {/* </AntLayout.Footer> */}
                <ThemeSwitcher />
              </AntLayout>
            </MessageProvider>
          </I18nextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
