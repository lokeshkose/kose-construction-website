import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; // Import Swiper styles
import styles from '../../styles/CustomGallery.module.css'; // Custom styles for the gallery

// Import required Swiper modules
import {Autoplay,  Navigation, Pagination, Scrollbar, EffectCoverflow} from 'swiper/modules';

const CustomGallery = ({ images }: { images: string[] }) => {
  return (
    <div className={styles.galleryContainer}>
      <Swiper
        spaceBetween={10}
        slidesPerView={1} // Adjust based on screen size
        loop={true}
        effect="coverflow" // Apply the Coverflow effect
        autoplay={{
          delay: 2500, // Time delay between slides (in ms)
          disableOnInteraction: false, // Don't stop autoplay on interaction
        }}
        modules={[Navigation, Pagination, Scrollbar, EffectCoverflow, Autoplay]}
        breakpoints={{
          440: {
            slidesPerView: 1, // For small screens, show 1 slide per view
          },
          768: {
            slidesPerView: 2, // For medium screens, show 2 slides per view
          },
          1024: {
            slidesPerView: 3, // For large screens, show 3 slides per view
          },
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className={styles.imageWrapper}>
              <img
                src={image}
                alt={`image-${index}`}
                className={styles.galleryImage}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CustomGallery;
