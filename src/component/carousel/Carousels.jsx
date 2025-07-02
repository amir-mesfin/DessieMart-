import React from 'react';
import { CarouselImages } from './CarouselData';
import { Carousel } from 'react-responsive-carousel';
import styles from './Carousel.module.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // core carousel CSS

function Carousels() {
  return (
    <div className={styles.carouselContainer}>
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
        interval={2000}
      >
        {CarouselImages.map((imageItemLink, index) => (
          <img src={imageItemLink} alt={`carousel-${index}`} key={index} />
        ))}
      </Carousel>
    </div>
  );
}

export default Carousels;
