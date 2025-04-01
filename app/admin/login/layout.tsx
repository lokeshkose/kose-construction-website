'use client';

import { Geist, Geist_Mono } from 'next/font/google';
import '../../globals.css';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../lib/i18n';
import 'antd/dist/reset.css';
import { Layout as AntLayout, App as AntApp } from 'antd'; // ✅ Import Ant Design App Wrapper
import { useEffect, useState } from 'react';
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
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as
      | 'light'
      | 'dark'
      | null;
    if (storedTheme) setTheme(storedTheme);
  }, []);

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
          backgroundColor: theme === 'light' ? '#ffffff' : '#1f1f1f',
        }}>
        <ThemeProvider>
          <I18nextProvider i18n={i18n}>
            <MessageProvider>
              <AntLayout style={{ minHeight: '100vh' }}>
                {/* Fixed Header */}
                {/* <Header /> */}

                {/* Language Switcher */}
                <div
                  style={{
                    zIndex: 9999999,                    padding: '32px',
                    right: '20px',
                    position: 'absolute',
                  }}>
                  <LanguageSwitcher />
                </div>

                {/* Main Content */}
                <AntLayout.Content
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    position: 'relative',
                  }}>
                  {children}
                </AntLayout.Content>

                {/* Footer */}
                {/* <AntLayout.Footer
                  style={{
                    textAlign: 'center',
                    backgroundColor: theme === 'light' ? '#ffffff' : '#1f1f1f',
                    padding: '16px 0',
                  }}>
                  <CustomFooter />
                </AntLayout.Footer> */}

                {/* Theme Switcher */}
                <ThemeSwitcher />
              </AntLayout>
            </MessageProvider>
          </I18nextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
