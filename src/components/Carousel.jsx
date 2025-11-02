import React, { useState, useEffect, useRef } from "react";
import styles from "./Carousel.module.css";
import image1 from "../assets/image_1.jpeg";
import image2 from "../assets/image_2.jpeg";
import image3 from "../assets/image_3.jpg";
import video1 from "../assets/vid_1.mp4";

const media = [
  { type: 'image', src: image1 },
  { type: 'image', src: image2 },
  { type: 'image', src: image3 },
  { type: 'video', src: video1 }
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [slidesToShow, setSlidesToShow] = useState(window.innerWidth > 768 ? 3 : 1);
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const totalSlides = media.length;
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setSlidesToShow(window.innerWidth > 768 ? 3 : 1);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Create extended array with clones for infinite effect
  const extendedMedia = [...media, ...media, ...media];

  useEffect(() => {
    // Start from the middle set of images
    setCurrentIndex(totalSlides);
  }, [totalSlides]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex(prev => prev + 1);
      setIsTransitioning(true);
    }, 5000); // 5 seconds per slide

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Reset position when reaching the end of cloned images
    if (currentIndex >= totalSlides * 2) {
      timeoutRef.current = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(totalSlides);
      }, 500); // Match transition duration
    } else if (currentIndex < totalSlides) {
      timeoutRef.current = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(totalSlides * 2 - 1);
      }, 500);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentIndex, totalSlides]);

  const trackStyle = {
    transform: `translateX(-${(currentIndex * 100) / slidesToShow}%)`,
    transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none'
  };

  // Calculate active marker based on actual position
  const activeMarker = currentIndex % totalSlides;

  const handleMarkerClick = (index) => {
    setCurrentIndex(totalSlides + index);
    setIsTransitioning(true);
  };

  // Touch event handlers for swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    // Clear auto-play interval when user starts swiping
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50; // Minimum distance for a swipe

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        // Swiped left - go to next slide
        setCurrentIndex(prev => prev + 1);
      } else {
        // Swiped right - go to previous slide
        setCurrentIndex(prev => prev - 1);
      }
      setIsTransitioning(true);
    }

    // Reset touch positions
    touchStartX.current = 0;
    touchEndX.current = 0;

    // Restart auto-play interval after swipe
    intervalRef.current = setInterval(() => {
      setCurrentIndex(prev => prev + 1);
      setIsTransitioning(true);
    }, 5000);
  };

  return (
    <div id="gallery" className={styles.carouselWrapper}>
      <div 
        className={styles.carouselContainer}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className={styles.carouselTrack} style={trackStyle}>
          {extendedMedia.map((item, idx) => (
            <div key={idx} className={styles.carouselSlide}>
              {item.type === 'image' ? (
                <img src={item.src} alt={`Slide ${(idx % totalSlides) + 1}`} />
              ) : (
                <video 
                  src={item.src} 
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.markers}>
        {media.map((_, idx) => (
          <span
            key={idx}
            className={`${styles.marker} ${idx === activeMarker ? styles.markerActive : ""}`}
            onClick={() => handleMarkerClick(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
