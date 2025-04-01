import DirectionAnimation from '@/animations/DirectionAnimation';
import { Button, Col, Row, Typography, Grid } from 'antd';
import React, { FC } from 'react';

const { Text, Title } = Typography;
const { useBreakpoint } = Grid;

interface SectionHeaderProps {
  title: string;
  subTitle: string;
  description: string;
  buttonText: string;
  id: string;
}

const SectionHeader: FC<SectionHeaderProps> = ({
  title,
  subTitle,
  description,
  buttonText,
  id,
}) => {
  const screens = useBreakpoint();

  return (
    <Row
      justify='space-between'
      align='middle'
      gutter={[16, 16]}
      style={{
        marginBlock: '30px',
        flexWrap: 'wrap',
        // padding: screens.md ? '0px' : '16px',
      }}>
      {/* Left Section (Title + Subtitle + Description) */}
      <Col
        xs={24}
        sm={24}
        md={16}
        lg={20}>
        <Text
          style={{
            fontSize: screens.md ? '18px' : '18px',
            fontWeight: 'bold',
          }}>
          {title}
        </Text>
        <DirectionAnimation
          id={id}
          start={-30}
          end={0}
          duration={2}
          direction='topToBottom'>
          <Title
            style={{
              margin: '16px 0px',
              fontSize: screens.md ? '38px' : '38px',
            }}>
            {subTitle}
          </Title>
        </DirectionAnimation>

        <Text style={{ fontSize: screens.md ? '16px' : '16px' }}>
          {description}
        </Text>
      </Col>

      {/* Right Section (Button) */}
      <Col
        xs={24}
        sm={24}
        md={8}
        lg={4}
        style={{
          textAlign: screens.md ? 'right' : 'center', // Align center on small screens
        }}>
        <Button
          type='default'
          shape='round'
          size='large'
          style={{
            width: screens.md ? 'auto' : '100%', // Full width on small screens
          }}>
          {buttonText}
        </Button>
      </Col>
    </Row>
  );
};

export default SectionHeader;
