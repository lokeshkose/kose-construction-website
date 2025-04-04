import { Button, Card, Col, Grid } from 'antd';
import React, { FC, ReactNode } from 'react';
import styles from '../../styles/ServiceCard.module.css';
import { motion } from 'framer-motion';
import DirectionAnimation from '@/animations/DirectionAnimation';

interface ServiceCardProps {
  title: string;
  icon: ReactNode;
  description: string;
  className: string;
  index: number;
  onNavigateDetail: () => void
}
const { Meta } = Card;
const { useBreakpoint } = Grid;

const ServiceCard: FC<ServiceCardProps> = ({
  title,
  icon,
  description,
  className,
  index,
  onNavigateDetail
}) => {
  const screens = useBreakpoint();
  return (
    <>
      <Col
        xs={24}
        md={12}>
        <DirectionAnimation
          id='dfasf'
          start={index % 2 === 0 ? 80 : 100}
          end={0}
          duration={index % 2 === 0 ? 1 : 1.3}
          direction='bottomToTop'>
          <Card
            className={`${styles['cardContainer']} ${className}`}
            title={
              <span
                className={styles['cardTitle']}
                style={{
                  fontSize: screens.md ? '50px' : '38px',
                  marginRight: '16px',
                }}>
                {title}
              </span>
            }
            // extra={icon}
            headStyle={{ borderBottom: 'none' }}>
            <Meta
              style={{ fontSize: screens.md ? '16px' : '16px' }}
              description={description}
            />
            {/* <Button
              style={{ marginTop: '16px' }}
              type='default'
              shape='round'
              size='large'
              onClick={onNavigateDetail}>
              Discover More
            </Button> */}
          </Card>
        </DirectionAnimation>
      </Col>
    </>
  );
};

export default ServiceCard;
