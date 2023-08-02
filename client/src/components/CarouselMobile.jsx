import React from 'react';
import { Carousel } from "@material-tailwind/react";

const CarouselMobile = () => {
  return (
    <Carousel className="rounded-xl sm:hidden carousel-slide ">
       
    <img
      src="./images/leandingMobile1.jpg"
      alt="image 1"
      className="h-full w-full object-cover "
    />
   
    <img
      src="./images/leandingMobile2.jpg"
      alt="image 2"
      className="h-full w-full object-cover"
    />
   
    <img
      src="./images/leandingMobile3.jpg"
      alt="image 3"
      className="h-full w-full object-cover"
    />
    <img
      src="./images/leandingMobile4.jpg"
      alt="image 4"
      className="h-full w-full object-cover"
    />
   
  </Carousel>
  )
}

export default CarouselMobile