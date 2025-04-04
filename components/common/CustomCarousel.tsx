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
      autoplay
      dotPosition={dotPosition}
      autoplaySpeed={3000}
      arrows={true}
      effect='fade'
      fade={true}
       waitForAnimate={true}
       speed={2800}
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
