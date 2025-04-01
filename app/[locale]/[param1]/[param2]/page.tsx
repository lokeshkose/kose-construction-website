'use client'
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import BannerTop from '@/components/common/BannerTop';
import DetailCard from '@/components/common/DetailCard';
import { Card, Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import * as Icons from '@ant-design/icons';

const Details = () => {
  const { t } = useTranslation('common');
  const pathName = usePathname();
  const [details, setDetails] = useState({
    title: '',
    description: '',
    data: [
      {
        title: '',
        data: [
          {
            title: '',
            icon: '',
            color: '',
            description: '',
          },
        ],
      },
    ],
  });

  useEffect(() => {
    const splittedValues = pathName.split('/');
    loadData(splittedValues[splittedValues.length - 1]);
  }, []);

  const loadData = (identifier: string) => {
    const filePath = `/data/${identifier}.json`;
    fetch(filePath)
      .then((res) => res.json())
      .then((data) => setDetails(data));
  };

  const getIconComponent = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName]; // Ensure dynamic lookup works
    return IconComponent ? <IconComponent style={{ fontSize: 40 }} /> : null;
  };

  return (
    <div className="mb-68">
      <BannerTop
        title={t('service')}
        backgroundVideo="/service_banner.mp4"
        onButtonClick={() => console.log('Button clicked')}
        bannerHeight={500}
      />

      <Row gutter={[16, 16]} justify="center" style={{ marginTop: 50 }}>
        <Col xs={22} sm={22} md={20} lg={18} xl={16}>
          <Card
            bordered={false}
            style={{
              marginBottom: '40px',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              padding: '24px',
            }}
          >
            <h2
              style={{
                fontSize: '30px',
                fontWeight: 'bold',
                marginBottom: '16px',
                color: '#1E3A8A',
              }}
            >
              {details.title}
            </h2>
            <p
              style={{
                fontSize: '18px',
                color: '#555',
                lineHeight: '1.6',
              }}
            >
              {details.description}
            </p>
          </Card>

          {details.data.map((category, index) => (
            <Card
              key={index}
              title={category.title}
              bordered={false}
              style={{
                marginBottom: '40px',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                padding: '24px',
              }}
              headStyle={{
                fontSize: '26px',
                fontWeight: 'bold',
                padding: '10px 16px',
                color: '#1E3A8A',
              }}
            >
              <Row gutter={[24, 24]}>
                {category.data.map((service, id) => (
                  <Col key={id} xs={24} sm={12} md={8} lg={8} xl={6}>
                    <DetailCard
                      title={service.title}
                      icon={getIconComponent(service.icon)}
                      description={service.description}
                    />
                  </Col>
                ))}
              </Row>
            </Card>
          ))}
        </Col>
      </Row>
    </div>
  );
};

export default Details;
