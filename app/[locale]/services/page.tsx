'use client';

import BannerTop from '@/components/common/BannerTop';
import { Col, Layout, Row, theme } from 'antd';
import ServiceSection from '@/components/home/ServicesSection';
import { useTranslation } from 'react-i18next';

const Service = () => {
  const { token } = theme.useToken();
  const { t } = useTranslation('common');
  return (
    <div>
      <BannerTop
        title={t('service')}
        buttonText='Get Started'
        // backgroundVideo='/service_banner.mp4'
        backgroundImage='/service_banner.png'
        onButtonClick={() => console.log('Button clicked')}
        breadcrumbs={[{ title: t('home') }, { title: t('service') }]}
        bannerHeight={600}
      />
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
          <ServiceSection />
        </Col>
      </Row>
    </div>
  );
};
export default Service;
