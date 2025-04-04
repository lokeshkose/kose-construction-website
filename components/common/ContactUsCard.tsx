import { Row, Col, Typography, Input, Button, Space, Form } from 'antd';
import { useTranslation } from 'react-i18next';
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  YoutubeOutlined,
} from '@ant-design/icons';
import DirectionAnimation from '@/animations/DirectionAnimation';
import { useState } from 'react';
import useContacts from '../../hooks/useContacts';
import { useMessageContext } from './MessageProvider';

const { Title, Text, Link } = Typography;
const { TextArea } = Input;

const socialLinks = [
  { icon: <FacebookOutlined />, url: 'https://facebook.com' },
  { icon: <TwitterOutlined />, url: 'https://twitter.com' },
  { icon: <InstagramOutlined />, url: 'https://instagram.com' },
  { icon: <YoutubeOutlined />, url: 'https://youtube.com' },
];

const ContactUsCard = ({ rightBgColor = '#f4a900' }) => {
  const { addContact } = useContacts();
  const { t } = useTranslation('common');
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { success, error } = useMessageContext();

  const handleSubmit = async (values: {
    name: string;
    email: string;
    mobile: string;
    message: string;
  }) => {
    console.log('Form Submitted!', values); // Check if this logs
    setLoading(true);
    try {
      const response = await addContact(values);
      if (response?.success) {
        success(t('contacts.successMessage'));
        form.resetFields();
      } else {
        throw new Error('Failed to add contact');
      }
    } catch (err) {
      error(t('contacts.errorMessage'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{}}>
      <Row gutter={[16, 16]}>
        {/* Left Section */}
        <Col
          xs={24}
          md={12}
          style={{ padding: '2rem' }}>
          <DirectionAnimation
            id='text-animation'
            start={400}
            end={0}
            duration={1}
            direction='rightToLeft'>
            <>
              <Text
                style={{
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  fontSize: '20px',
                }}>
                {t('contacts.contact')}
              </Text>
              <Title
                level={1}
                style={{ marginTop: '16px' }}>
                {t('contacts.contactTitle')}
              </Title>
              <Text
                type='secondary'
                style={{ fontSize: '16px' }}>
                {t('contacts.contactDescription')}
              </Text>

              <Title
                level={4}
                style={{ marginTop: '2rem' }}>
                {t('contacts.contactUs')}
              </Title>
              <Text style={{ display: 'block' }}>
                <Link
                  type='secondary'
                  href='https://maps.google.com/?q'
                  target='_blank'
                  rel='noopener noreferrer'>
                  {t('contacts.address')}
                </Link>
              </Text>

              <Text style={{ display: 'block' }}>
                <Link
                  href='mailto:koseconstructioon155@gmail.com'
                  type='secondary'>
                  {t('contacts.email')}
                </Link>
              </Text>

              <Text style={{ display: 'block' }}>
                <Link
                  href='tel:+917773006438'
                  type='secondary'>
                  7773006438
                </Link>
                ,
                <Link
                  href='tel:+917400969090'
                  type='secondary'>
                  7400969090
                </Link>
              </Text>
              {/* <Text style={{ display: "block" }}>{t("contacts.address")}</Text>
              <Text style={{ display: "block" }}>{t("contacts.email")}</Text>
              <Text style={{ display: "block" }}>{t("contacts.phone")}</Text> */}

              <Space
                size='large'
                style={{ marginTop: '2rem' }}>
                {/* {socialLinks.map(({ icon, url }, index) => (
                  <a
                    key={index}
                    href={url}
                    target='_blank'
                    rel='noopener noreferrer'
                    style={{ fontSize: '24px' }}>
                    {icon}
                  </a>
                ))} */}
                <Link
                  type='secondary'
                  target='_blank'
                  href='https://www.facebook.com/profile.php?id=61573572743388'>
                  <FacebookOutlined style={{ fontSize: '24px' }} />
                </Link>
                <Link
                  type='secondary'
                  target='_blank'
                  href='https://x.com/EarlytechInfo'>
                  <TwitterOutlined style={{ fontSize: '24px' }} />
                </Link>
                <Link
                  type='secondary'
                  target='_blank'
                  href='https://www.instagram.com/earlytech.info/'>
                  <InstagramOutlined style={{ fontSize: '24px' }} />
                </Link>
                <Link
                  type='secondary'
                  target='_blank'
                  href='https://www.youtube.com/@EarlyTech-info'>
                  <YoutubeOutlined style={{ fontSize: '24px' }} />
                </Link>
              </Space>
            </>
          </DirectionAnimation>
        </Col>

        {/* Right Section */}
        <Col
          xs={24}
          md={12}
          style={{ backgroundColor: rightBgColor, padding: '2rem' }}>
          <DirectionAnimation
            id='text-animation'
            start={-400}
            end={0}
            duration={1}
            direction='leftToRight'>
            <>
              <Title level={3}>{t('contacts.messageTitle')}</Title>
              <Text style={{ fontSize: '16px' }}>
                {t('contacts.messageDescription')}
              </Text>

              <Form
                form={form}
                onFinish={handleSubmit}
                // onSubmit={handleSubmit}
                style={{ marginTop: '2rem' }}>
                <Form.Item
                  name='name'
                  rules={[
                    { required: true, message: t('contacts.nameRequired') },
                  ]}>
                  <Input
                    placeholder={t('contacts.namePlaceholder')}
                    style={{ marginBottom: '1rem', padding: '1rem' }}
                  />
                </Form.Item>
                <Form.Item
                  name='mobile'
                  rules={[
                    { required: true, message: t('contacts.mobileRequired') },
                    {
                      pattern: /^\+?[0-9]{10,15}$/,
                      message: t('contacts.mobileInvalid'),
                    },
                  ]}>
                  <Input
                    placeholder={t('contacts.mobilePlaceholder')}
                    style={{ marginBottom: '1rem', padding: '1rem' }}
                  />
                </Form.Item>

                <Form.Item
                  name='email'
                  rules={[
                    { required: true, message: t('contacts.emailRequired') },
                    { type: 'email', message: t('contacts.emailInvalid') },
                  ]}>
                  <Input
                    type='email'
                    placeholder={t('contacts.emailPlaceholder')}
                    style={{ marginBottom: '1rem', padding: '1rem' }}
                  />
                </Form.Item>
                <Form.Item
                  name='message'
                  rules={[
                    { required: true, message: t('contacts.messageRequired') },
                  ]}>
                  <TextArea
                    placeholder={t('contacts.messagePlaceholder')}
                    rows={4}
                    style={{ marginBottom: '1rem', padding: '1rem' }}
                  />
                </Form.Item>
                <Button
                  htmlType='submit'
                  type='default'
                  shape='round'
                  size='large'
                  loading={loading}
                  disabled={loading} // Prevent multiple submissions
                  onClick={() => form.submit()}>
                  {t('contacts.sendMessage')}
                </Button>
              </Form>
            </>
          </DirectionAnimation>
        </Col>
      </Row>
    </div>
  );
};

export default ContactUsCard;
