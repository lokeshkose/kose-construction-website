'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Layout, Menu, Drawer, Button, Grid, Row, Col } from 'antd';
import { MenuOutlined, DownOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import styles from '../../styles/Header.module.css';
import LanguageSwitcher from './LanguageSwitcher';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import i18n from '@/lib/i18n';
import ThemeSwitcher from './ThemeSwitcher';

const { Header: AntHeader } = Layout;
const { useBreakpoint } = Grid;

const Header = () => {
  const { t } = useTranslation('common');
  const [visible, setVisible] = useState(false);
  const screens = useBreakpoint();

  const showDrawer = () => setVisible(true);
  const closeDrawer = () => setVisible(false);

  const params = useParams();
  const locale: any = i18n.language || params?.locale || 'en';

  useEffect(() => {
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale); // Sync language with URL
    }
  }, [locale, i18n]);

  const menuItems = [
    { key: 'home', label: t('home'), link: `/${locale}/` },
    { key: 'about', label: t('about'), link: `/${locale}/about` },
    { key: 'services', label: t('service'), link: `/${locale}/services` },
    { key: 'ourWorks', label: t('ourWorks'), link: `/${locale}/our_works` },
    { key: 'contactUs', label: t('contactUs'), link: `/${locale}/contact` },
    { key: 'requestQuote', label: t('requestQuote'), link: `/${locale}/quote` },
  ];

  const renderMenuItems = (items: any[]) =>
    items.map((item) => (
      <Menu.Item
        key={item.key}
        onClick={closeDrawer}>
        <Link href={item.link}>{item.label}</Link>
      </Menu.Item>
    ));

  return (
    <Layout className={styles.headerLayout}>
      <AntHeader className={styles.headerContainer}>
        <Row
          justify='space-between'
          align='middle'
          className={styles.headerRow}
          style={{ textAlign: 'center', width: '100vw' }}>
          <Col
            xs={12}
            sm={12}
            md={{ span: 6, offset: 4 }}
            lg={{ span: 8, offset: 4 }}
            xl={{ span: 6, offset: 4 }}
            className={styles.headerLeft}>
            {!screens.lg && (
              <Button
                type='link'
                style={{ display: 'flex' }}
                icon={<MenuOutlined style={{ fontSize: '36px' }} />}
                onClick={showDrawer}
              />
            )}
            <div className={styles.logo}>
              <Link href='/'>
                <Image
                  src='/logo.png'
                  alt='Logo'
                  width={screens.xs ? 210 : screens.md ? 300 : 250}
                  height={screens.md ? 80 : 70}
                  priority
                />
              </Link>
            </div>
          </Col>

          <Col
            xs={0}
            sm={0}
            md={9}
            lg={11}
            xl={13}>
            {screens.lg && (
              <Menu
                mode='horizontal'
                className={styles.headerMenu}
                defaultSelectedKeys={['home']}>
                {renderMenuItems(menuItems)}
              </Menu>
            )}
          </Col>
          <Col
            xs={4}
            sm={4}
            md={2}
            lg={1}
            xl={1}>
            <LanguageSwitcher />
          </Col>
        </Row>

        <Drawer
          placement='top'
          onClose={closeDrawer}
          open={visible}
          className='custom-drawer'>
          <Menu mode='inline'>{renderMenuItems(menuItems)}</Menu>
        </Drawer>
      </AntHeader>
    </Layout>
  );
};

export default Header;
