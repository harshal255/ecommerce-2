import React from 'react';
import { Carousel } from "@material-tailwind/react";

const CarouselBig = () => {
  return (
    <div className='hidden sm:block'>
    <Carousel className="rounded-xl ">
    <img
      src="./images/leanding1.jpg"
      alt="image 1"
      className="h-full w-full object-cover "
    />
    
    <img
      src="./images/leanding2.jpg"
      alt="image 2"
      className="h-full w-full object-cover"
    />
  
    <img
      src="./images/leanding3.jpg"
      alt="image 3"
      className="h-full w-full object-cover"
    />
  
    <img
      src="./images/leanding4.jpg"
      alt="image 4"
      className="h-full w-full object-cover"
    />
  
  </Carousel>
  </div>
  )
}

export default CarouselBig