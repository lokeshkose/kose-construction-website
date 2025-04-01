import { Form, Input, Button, Col, Row, message } from 'antd';
import { MobileOutlined, LockOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import DirectionAnimation from '@/animations/DirectionAnimation';
import { FC } from 'react';
import { useMessageContext } from './MessageProvider';

const MOBILE_REGEX = /^[0-9]{10,15}$/; // Adjust regex as needed

interface LoginCardProps {
  onLogin: (values: { mobile: string; password: string }) => void;
}

const LoginCard: FC<LoginCardProps> = ({ onLogin }) => {
  const [form] = Form.useForm();
  const { t } = useTranslation('common');

  const handleFinish = (values: { mobile: string; password: string }) => {
    onLogin(values);
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: "url('/home_banner.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          padding: '16px',
          borderRadius: '10px',
          backdropFilter: 'blur(2px)',
          width: '80vw',
          height: '60vh',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>
          
        <Row
          gutter={[16, 16]}
          justify='center'>
          {/* Left Side - Logo & Text */}
          <Col
            xs={24}
            md={12}>
            <DirectionAnimation
              id='text-animation'
              start={100}
              end={0}
              duration={1}
              direction='bottomToTop'>
              <div style={{ color: 'white', padding: '20px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '20px',
                  }}>
                  <Image
                    src='/logo.png'
                    alt='Galileo logo'
                    width={200}
                    height={50}
                  />
                </div>
                <h1 style={{ fontSize: '32px', fontWeight: 'bold' }}>
                  {t('login.title')}
                </h1>
                <p style={{ fontSize: '16px' }}>{t('login.subtitle')}</p>
              </div>
            </DirectionAnimation>
          </Col>

          {/* Right Side - Login Form */}
          <Col
            xs={24}
            md={12}>
            <DirectionAnimation
              id='image-animation'
              start={-100}
              end={10}
              duration={2}
              direction='topToBottom'>
              <div
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  padding: '20px',
                  borderRadius: '10px',
                }}>
                <h2
                  style={{
                    color: 'white',
                    fontSize: '20px',
                    fontWeight: 'bold',
                  }}>
                  {t('login.form.welcome')}
                </h2>
                <p style={{ color: 'white' }}>{t('login.form.login_prompt')}</p>

                <Form
                  form={form}
                  name='login'
                  initialValues={{ remember: true }}
                  onFinish={handleFinish}>
                  {/* Mobile Field with Validation */}
                  <Form.Item
                    name='mobile'
                    rules={[
                      { required: true, message: t('login.form.mobile_error') },
                      {
                        pattern: MOBILE_REGEX,
                        message: t('login.form.mobile_invalid'),
                      },
                    ]}>
                    <Input
                      prefix={<MobileOutlined />}
                      placeholder={t('login.form.mobile_placeholder')}
                    />
                  </Form.Item>

                  {/* Password Field */}
                  <Form.Item
                    name='password'
                    rules={[
                      {
                        required: true,
                        message: t('login.form.password_error'),
                      },
                    ]}>
                    <Input.Password
                      prefix={<LockOutlined />}
                      placeholder={t('login.form.password_placeholder')}
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type='primary'
                      htmlType='submit'
                      style={{ width: '100%' }}>
                      {t('login.form.button')}
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </DirectionAnimation>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default LoginCard;
