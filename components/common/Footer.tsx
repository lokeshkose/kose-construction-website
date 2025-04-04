import React from 'react';
import { useTranslation } from 'react-i18next';
import { Layout, Row, Col, Typography, Space, Grid } from 'antd';
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  YoutubeOutlined,
} from '@ant-design/icons';
import Subscription from './Subscription';
import DirectionAnimation from '@/animations/DirectionAnimation';

const { Footer } = Layout;
const { Title, Text, Link } = Typography;
const { useBreakpoint } = Grid;

const logoPath = '/jcb-logo.png';

const CustomFooter = () => {
  const { t } = useTranslation('common');
  const screens = useBreakpoint();

  return (
    <>
      <Row
        gutter={[16, 16]}
        justify='center'
        style={{ marginBottom: 0 }}>
        {/* <Col xs={24} sm={22} md={20} lg={18} xl={16}>
          <div style={{ position: "relative", top: "70px" }}>
            <DirectionAnimation
              id="dfasf"
              start={450}
              end={0}
              duration={1}
              direction="rightToLeft"
            >
              <Subscription />
            </DirectionAnimation>
          </div>
        </Col> */}
      </Row>
      <Footer
        style={{
          backgroundColor: '#f4a900',
          color: 'white',
          padding: screens.xs ? '50px 16px' : '80px',
          textAlign: 'center',
        }}>
        <DirectionAnimation
          id='dfasf'
          start={-450}
          end={0}
          duration={1}
          direction='leftToRight'>
          <div
            style={{
              marginTop: '24px',
            }}>
            <Row
              gutter={[16, 16]}
              justify='center'
              style={{
                marginTop: '24px',
                rowGap: '16px', // Correct property name for row gap in flex layout
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'space-around',
              }}>
              <Col
                xs={24}
                sm={16}
                md={8}
                style={{ textAlign: 'center' }}>
                <img
                  style={{ width: '125px' }}
                  src={logoPath}
                  alt='Logo'
                />
                <br />
                <Text style={{ color: 'white' }}>
                  {t('footer.description')}
                </Text>
              </Col>
              <Col
                xs={24}
                sm={16}
                md={8}
                style={{ textAlign: 'center' }}>
                <Title
                  level={4}
                  style={{ color: 'white' }}>
                  {t('footer.contactUs')}
                </Title>
                <Text style={{ color: 'white' }}>
                  <Link
                    style={{ color: 'white' }}
                    href='https://maps.google.com/?q=Pragati Vihar, Badia Keema, Madhya Pradesh 452016'
                    target='_blank'
                    rel='noopener noreferrer'>
                    {t('footer.address')}
                  </Link>
                </Text>
                {/* <Text style={{ color: 'white' }}>{t('footer.address')}</Text> */}
                <br />
                <Text style={{ color: 'white' }}>
                  {' '}
                  <Link
                    style={{ color: 'white' }}
                    href='mailto:earlytech.info@gmail.com'>
                    {t('footer.email')}
                  </Link>
                </Text>
                <br />
                <Space style={{ marginTop: '16px' }}>
                  <Link
                    target='_blank'
                    href='https://www.facebook.com/profile.php?id=61573572743388'>
                    <FacebookOutlined
                      style={{ fontSize: '24px', color: 'white' }}
                    />
                  </Link>
                  <Link
                    target='_blank'
                    href='https://x.com/EarlytechInfo'>
                    <TwitterOutlined
                      style={{ fontSize: '24px', color: 'white' }}
                    />
                  </Link>
                  <Link
                    target='_blank'
                    href='https://www.instagram.com/earlytech.info/'>
                    <InstagramOutlined
                      style={{ fontSize: '24px', color: 'white' }}
                    />
                  </Link>
                  <Link
                    target='_blank'
                    href='https://www.youtube.com/@EarlyTech-info'>
                    <YoutubeOutlined
                      style={{ fontSize: '24px', color: 'white' }}
                    />
                  </Link>
                </Space>
              </Col>
              <Col>
                <Space>
                  <Link
                    href='/en/support'
                    style={{
                      color: 'white',
                      fontSize: '14px',
                      fontWeight: 'bold',
                    }}>
                    {t('footer.support')}
                  </Link>
                  <Link
                    href='/en/privacy'
                    style={{
                      color: 'white',
                      fontSize: '14px',
                      fontWeight: 'bold',
                    }}>
                    {t('footer.privacyStatement')}
                  </Link>
                  <Link
                    href='/en/terms'
                    style={{
                      color: 'white',
                      fontSize: '14px',
                      fontWeight: 'bold',
                    }}>
                    {t('footer.termsOfUse')}
                  </Link>
                  {/* <Link href="#"    style={{ color: 'white', fontSize: '16px', fontWeight: 'bold' }}>{t('footer.cookies')}</Link> */}
                </Space>
                <br />
                <Text style={{ color: 'white' }}>{t('footer.copyright')}</Text>
              </Col>
            </Row>
          </div>
        </DirectionAnimation>
      </Footer>
    </>
  );
};

export default CustomFooter;
