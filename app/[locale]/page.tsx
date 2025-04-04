'use client';

import { useTranslation } from 'react-i18next';
import Service from '@/components/home/ServicesSection';
import WorksSection from '@/components/home/Work';
import JoinUs from '@/components/home/JoinUs';
import { Col, Row, theme } from 'antd';
import AboutCard from '@/components/common/AboutCard';
import StatsSection from '@/components/home/StatsSection';
import styles from '../../styles/Home.module.css';
import BannerTop from '@/components/common/BannerTop';
import { useRouter } from 'next/navigation';
import CustomCarousel from '@/components/common/CustomCarousel';
import CustomGallery from '@/components/common/CustomGallary';
export default function Home() {
  const { t } = useTranslation('common');
  const { token } = theme.useToken();
  const router = useRouter();
  const statsData = [
    {
      value: 95,
      description: t('stats.successRate'),
      suffix: '%',
      decimalPlaces: 0,
    },
    {
      value: 5000,
      description: t('stats.businesses'),
      suffix: '+',
      decimalPlaces: 0,
    },
    {
      value: 4800,
      description: t('stats.clients'),
      suffix: '+',
      decimalPlaces: 0,
    },
    {
      value: 4.7,
      description: t('stats.reviews'),
      suffix: '',
      decimalPlaces: 1,
    },
  ];

  const aboutData = {
    title: t('abouts.title'),
    subTitle: t('abouts.subtitle', 'abouts Us'),
    description: t('abouts.description'),
    buttonText: t('abouts.button'),
    imageUrl: '/about_us.png',
  };

  const bannerData = {
    title: t('homeBanner.title'),
    description: t('homeBanner.description'),
    buttonText: t('homeBanner.buttonText'),
    backgroundVideo: '/home_banner.mp4',
    bannerHeight: 830,
    // backgroundImage:'/home_banner.png'
    // 'https://storage.googleapis.com/a1aa/image/pOuMS3EDbR0tpzgX8wCYrxtCakO4X65QJuOo4t2UkCc.jpg',
  };
  const handleSubmit = async () => {
    router.push('/en/quote');
    console.log('button clicked');
  };
  const handleAboutSubmit = async () => {
    router.push('/en/about');
    console.log('button clicked');
  };

  const bannerImages = [
    '/banner2.png',
    '/banner1.png',
    '/banner3.jpg',
    '/banner7.png',
    '/banner8.jpg',
  ];
  const gallaryImages = [
    '/gallary2.jpg',
    '/gallary3.jpg',
    '/gallary4.jpg',
    '/gallary5.jpg',
    '/gallary6.jpg',

    '/gallary10.jpg',
    '/gallary11.jpg',
    '/gallary12.jpg',
    '/gallary13.jpg',
    '/gallary14.jpg',
    '/gallary15.jpg',
    '/gallary16.jpg',
  ];

  return (
    <>
      {/* Banner Section */}
      {/* <BannerTop
        {...bannerData}
        isHomeComp={true}
        onButtonClick={handleSubmit}
      /> */}

      <CustomCarousel images={bannerImages} />

      {/* Stats Section */}
      <Row
        gutter={[16, 16]}
        justify='center'
        style={{ background: token.colorPrimaryBg, marginBottom: 50 }}
        className={styles.statsWrapper}>
        <Col
          xs={24}
          sm={22}
          md={20}
          lg={18}
          xl={16}>
          <StatsSection stats={statsData} />
        </Col>
      </Row>

      {/* About Section */}
      <Row
        gutter={[16, 16]}
        justify='center'
        style={{ marginBottom: 0 }}>
        <Col
          xs={24}
          sm={22}
          md={20}
          lg={18}
          xl={16}>
          <AboutCard
            {...aboutData}
            onButtonClick={handleAboutSubmit}
            isHome={true}
          />
        </Col>
      </Row>

      {/* Service Section */}
      <Row
        gutter={[16, 16]}
        justify='center'
        style={{ marginBottom: 30 }}>
        <Col
          xs={22}
          sm={22}
          md={20}
          lg={18}
          xl={16}>
          <Service />
        </Col>
      </Row>
      {/* Gallary Section */}
      <Row
        gutter={[16, 16]}
        justify='center'
        style={{ marginBottom: 40, marginTop: 40}}>
        <Col
          xs={22}
          sm={22}
          md={22}
          lg={22}
          xl={20}>
          {/* <JoinUs /> */}
          <CustomGallery images={gallaryImages} />
        </Col>
      </Row>

      {/* Works Section */}
      <Row
        gutter={[16, 16]}
        justify='center'
        style={{ marginBottom: 70 }}>
        <Col
          xs={22}
          sm={22}
          md={20}
          lg={18}
          xl={16}>
          <WorksSection />
        </Col>
      </Row>
    </>
  );
}
