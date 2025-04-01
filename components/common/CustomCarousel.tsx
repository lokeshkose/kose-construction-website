import React from 'react';
import { Carousel } from 'antd';
import styles from '../../styles/CustomCaousel.module.css';

const CustomCarousel = ({
  images,
  autoplay = true,
  dotPosition = 'bottom',
}: any) => {
  return (
    <Carousel
      autoplay={autoplay}
      dotPosition={dotPosition}
      className={styles.carouselContainer}>
      {images.map((image: any, index: number) => (
        <div
          key={index}
          className={styles.carouselItem}>
          <img
            src={image}
            alt={`slide-${index}`}
            className={styles.carouselImage}
          />
        </div>
      ))}
    </Carousel>
  );
};

export default CustomCarousel;
