'use client';
import BannerTop from '@/components/common/BannerTop';
import { useTranslation } from 'react-i18next';
import RequestCard from '../../../components/common/RequestCard';
import { Col, Row } from 'antd';
export default function Home() {
  const { t } = useTranslation('common');

  return (
    <div
      div
      className='mb-68'>
      <BannerTop
        title={t('quote.title')}
        buttonText={t('get started')}
        backgroundVideo='/request_banner.mp4'
        // backgroundImage="/service_banner.png"
        onButtonClick={() => console.log('Button clicked')}
        breadcrumbs={[{ title: t('home') }, { title: t('quote.title') }]}
        bannerHeight={600}
      />
      <Row
        gutter={[16, 16]}
        justify='center'
        style={{ marginBottom: 30, marginTop: '40px' }}>
        <Col
          xs={24}
          sm={22}
          md={20}
          lg={18}
          xl={16}>
          <RequestCard />
        </Col>
      </Row>
    </div>
  );
}
