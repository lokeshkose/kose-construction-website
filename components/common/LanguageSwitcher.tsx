'use client';

import { Dropdown, Button, MenuProps } from 'antd';
import { DownOutlined, GlobalOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const [selectedLang, setSelectedLang] = useState('en');

  useEffect(() => {
    const urlLang = pathname.split('/')[1];
    if (urlLang === 'en' || urlLang === 'hi') {
      setSelectedLang(urlLang);
      i18n.changeLanguage(urlLang);
    } else {
      setSelectedLang('en');
      i18n.changeLanguage('en');
    }
  }, [pathname, i18n]);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setSelectedLang(lang);
    const cleanPath = pathname.replace(/^\/(en|hi)/, '') || '/';
    router.push(`/${lang}${cleanPath}`);
  };

  const menuItems: MenuProps['items'] = [
    {
      key: 'en',
      label: `🇬🇧 English ${selectedLang === 'en' ? '✔' : ''}`,
    },
    {
      key: 'hi',
      label: `🇮🇳 हिन्दी ${selectedLang === 'hi' ? '✔' : ''}`,
    },
  ];

  return (
    <div>
      <Dropdown
        menu={{
          items: menuItems,
          onClick: (e) => changeLanguage(e.key),
        }}
        trigger={['click']}
      >
        <Button type="primary" shape="circle" size="large">
          <GlobalOutlined />
        </Button>
      </Dropdown>
    </div>
  );
};


export default LanguageSwitcher;
