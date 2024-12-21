import { useState, useEffect, useRef } from "react";

const Slider = ({ children, position = 0, height }) => {
  const [currentIndex, setCurrentIndex] = useState(position);
  const containerRef = useRef(null);
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % children.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + children.length) % children.length);
  };

  useEffect(() => {
    if (position > currentIndex) {
      for (let i = currentIndex; i < position; i++) {
        nextSlide();
      }
    } else if (position < currentIndex) {
      for (let i = currentIndex; i > position; i--) {
        prevSlide();
      }
    }
  }, [position]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.height = height;
    }
  }, [height]);

  return (
    <div className="slider-container w-full" ref={containerRef}>
      <div
        className="slider w-full"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Slider;
