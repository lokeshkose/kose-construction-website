'use client';

import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  DatabaseOutlined,
  LaptopOutlined,
  MobileOutlined,
  RobotOutlined,
} from '@ant-design/icons';
import { Row } from 'antd';
import styles from '../../styles/ServiceSection.module.css';
import ServiceCard from '../common/ServiceCard';
import SectionHeader from '../common/SectionHeader';
import { TFunction } from 'next-i18next';
import { usePathname, useRouter } from 'next/navigation';

const ServiceSection: FC = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const pathName = usePathname(); // Get current path

  const onNavigateDetail = (title: string) => {
    const locale = pathName.split('/')[1] || 'en';
    const englishTitle = t(title, { lng: 'en' });
    console.log(englishTitle);

    router.push(`/${locale}/services/${englishTitle.split(' ').join('_')}`);
  };

  const getServiceData = (t: TFunction) => [
    {
      title: t('services.list.0.title', 'Mobile Development'),
      icon: <MobileOutlined className={styles.cardIcon} />,
      description: t(
        'services.list.0.description',
        'We develop mobile applications tailored to your needs.'
      ),
      className: styles.cardBackgroundMobile,
      slug: 'services.list.0.slug',
    },
    {
      title: t('services.list.1.title', 'Back-end Development'),
      icon: <DatabaseOutlined className={styles.cardIcon} />,
      description: t(
        'services.list.1.description',
        'Robust and scalable back-end development services.'
      ),
      className: styles.cardBackgroundBackend,
      slug: 'services.list.1.slug',
    },
    {
      title: t('services.list.2.title', 'Front-end Development'),
      icon: <LaptopOutlined className={styles.cardIcon} />,
      description: t(
        'services.list.2.description',
        'Modern and responsive front-end development solutions.'
      ),
      className: styles.cardBackgroundFrontend,
      slug: 'services.list.2.slug',
    },
    {
      title: t('services.list.3.title', 'AI Development'),
      icon: <RobotOutlined className={styles.cardIcon} />,
      description: t(
        'services.list.3.description',
        'We build AI-powered solutions for businesses.'
      ),
      className: styles.cardBackgroundAi,
      slug: 'services.list.3.slug',
    },
  ];

  const services = useMemo(() => getServiceData(t), [t]);

  return (
    <section className={styles.serviceSection}>
      {/* Section Header */}
      <SectionHeader
        title={t('services.sectionTitle', 'SERVICES')}
        subTitle={t('services.sectionSubtitle', 'Our Services')}
        description={t(
          'services.sectionDescription',
          'We provide high-quality development services to help your business grow faster.'
        )}
        buttonText={t('services.buttonText', 'Our All Services')}
        id='1'
      />

      {/* Service Cards */}
      <Row
        gutter={[24, 24]}
        className={styles.serviceRow}>
        {services.map((service, index: number) => (
          <ServiceCard
            key={index}
            index={index}
            {...service}
            onNavigateDetail={() => onNavigateDetail(service.slug)}
          />
        ))}
      </Row>
    </section>
  );
};

export default ServiceSection;
