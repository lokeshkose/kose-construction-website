'use client'; // Ensures compatibility with Next.js

import { Row, Col, Typography, theme, Grid } from 'antd';
import React, { FC } from 'react';
import styles from './../../styles/Home.module.css'; // Import CSS module
import CountingAnimation from '../../animations/CountingAnimation';

const { Text } = Typography;
const { useBreakpoint } = Grid;

interface StatItem {
  value: number;
  description: string;
  suffix: string
}

interface StatsSectionProps {
  stats: StatItem[];
}

const StatsSection: FC<StatsSectionProps> = ({ stats }) => {
  const { token } = theme.useToken();
  const screens = useBreakpoint();

  return (
    <section
      className={styles.statsSection}
      style={{ background: token.colorPrimaryBg }}>
      <Row
        justify='space-around'
        align='middle'
        className={styles.statsContainer}
        gutter={[24, 24]}>
        {stats.map((stat, index) => (
          <Col
            key={index}
            xs={24}
            sm={12}
            md={6}>
            <div className={styles.statItem}>
              <Text
                className={styles.statNumber}
                style={{ fontSize: screens.md ? '40px' : '32px' }}>
                <CountingAnimation
                  start={0}
                  end={stat.value}
                  suffix={stat.suffix}>
                  {/* {stat.value} */}
                </CountingAnimation>
              </Text>
              <Text
                type='secondary'
                className={styles.statText}
                style={{ fontSize: screens.md ? '18px' : '18px' }}>
                {stat.description}
              </Text>
            </div>
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default StatsSection;
