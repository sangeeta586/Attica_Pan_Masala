import React, { useState } from 'react';
import Mdsir2 from "../../src/assets/Mdsir2.jpg";
import Mdsir4 from "../../src/assets/Mdsir4.jpg";
import Mdsir5 from "../../src/assets/Mdsir5.png";

const CarouselDefault = () => {
  const images = [
    Mdsir2,
    Mdsir4,
    Mdsir5,
    Mdsir2
    // Add more image URLs as needed
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Slide ${index}`} className="w-full max-h-96 object-cover" />
        ))}
      </div>
      <button className="absolute top-1/2 transform -translate-y-1/2 left-4 bg-gray-800 text-white px-3 py-1 rounded-md shadow-md" onClick={prevSlide}>Prev</button>
      <button className="absolute top-1/2 transform -translate-y-1/2 right-4 bg-gray-800 text-white px-3 py-1 rounded-md shadow-md" onClick={nextSlide}>Next</button>
    </div>
  );
};

export default CarouselDefault;
