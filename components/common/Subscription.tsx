import { Row, Col, Typography, Input, Button, Form } from 'antd';
import styles from '../../styles/Subscription.module.css';
import { useTranslation } from 'react-i18next';
import useSubscriptions from '../../hooks/useSubscriptions';
import { useState } from 'react';
import { useMessageContext } from './MessageProvider';

const { Title, Text } = Typography;

const Subscription = () => {
  const [form] = Form.useForm();
  const { addSubscription } = useSubscriptions();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation('common'); // Assuming 'common' is the namespace
  const { success, error } = useMessageContext();

  const handleSubmit = async (values: { status: string; email: string }) => {
    setLoading(true);
    try {
      values.status = 'ACTIVE';
      const response: any = await addSubscription(values);
      if (response?.success) {
        success(t('subscription.successMessage'));
        form.resetFields();
      } else {
        error(response)
      }
    } catch (err) {
      error(t('subscription.errorMessage'));
    } finally {
      setLoading(false);
    }
  };
  // Store translations in an object
  const subscriptionTexts = {
    newsletter: t('subscription.newsletter'),
    title: t('subscription.title'),
    subtitle: t('subscription.subTitle'),
    description: t('subscription.description'),
    placeholder: t('subscription.placeholder'),
    button: t('subscription.button'),
  };

  return (
    <div className={styles.newsletterContainer}>
      <Row
        justify='space-between'
        align='middle'
        gutter={[32, 32]}>
        {/* LEFT SECTION */}
        <Col
          xs={24}
          md={12}
          className={styles.leftCol}>
          <Text className={styles.newsletterText}>
            {subscriptionTexts.newsletter}
          </Text>
          <Title className={styles.newsletterTitle}>
            {subscriptionTexts.title}
          </Title>
        </Col>

        {/* RIGHT SECTION */}
        <Col
          xs={24}
          md={12}
          className={styles.newsletterForm}>
          <Title
            level={3}
            className={styles.newsletterSubtitle}>
            {subscriptionTexts.subtitle}
          </Title>
          <Text className={styles.newsletterDescription}>
            {subscriptionTexts.description}
          </Text>
          <Form
            form={form}
            onFinish={handleSubmit}
            layout='vertical'
            style={{ marginTop: '2rem' }}>
            <div style={{ marginTop: '16px' }}>
              <Form.Item
                name='email'
                rules={[
                  { required: true, message: t('subscription.emailRequired') },
                  { type: 'email', message: t('subscription.emailInvalid') },
                ]}>
                <Input
                  type='email'
                  style={{
                    width: '60%',
                    background: 'white',
                    marginRight: '16px',
                    color: 'black', // Ensures text is visible
                  }}
                  placeholder={subscriptionTexts.placeholder}
                />
              </Form.Item>
              <Button
                htmlType='submit'
                loading={loading}
                disabled={loading}
                type='primary'
                className={styles.subscribeButton}
                onClick={() => form.submit()}>
                {subscriptionTexts.button}
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Subscription;
