'use client';

import { Row, Col, Typography, theme, Grid } from 'antd';
import React, { FC } from 'react';
import styles from './../../styles/Home.module.css';
import CountingAnimation from '../../animations/CountingAnimation';

const { Text } = Typography;
const { useBreakpoint } = Grid;

interface StatItem {
  decimalPlaces: number | undefined;
  value: number;
  description: string;
  suffix: string;
}

interface StatsSectionProps {
  stats: StatItem[];
}

const StatsSection: FC<StatsSectionProps> = ({ stats }) => {
  const { token } = theme.useToken();
  const screens = useBreakpoint();

  return (
    <section className={styles.statsSection}>
      <div className={styles.glowEffect}></div>

      <Row justify="center" align="middle" gutter={[40, 40]}>
        {stats.map((stat, index) => (
          <Col key={index} xs={24} sm={12} md={6}>
            <div className={styles.diamondWrapper}>
              <div className={styles.statDiamond}>
                <div className={styles.statContent}>
                  <Text
                    // className={styles.statNumber}
                    style={{
                      // fontSize: screens.md ? '42px' : '32px',
                      fontWeight: 800,
                      textShadow: '0 4px 12px rgba(255, 255, 255, 0.3)',
                    }}>
                    <CountingAnimation start={0} end={stat.value} suffix={stat.suffix} decimalPlaces={stat.decimalPlaces} />
                  </Text>
                  <Text
                    className={styles.statText}
                    style={{
                      fontSize: screens.md ? '16px' : '14px',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      fontWeight: 600,
                    }}>
                    {stat.description}
                  </Text>
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default StatsSection;
