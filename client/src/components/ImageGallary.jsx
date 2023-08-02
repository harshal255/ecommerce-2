import React from 'react';
import Heading from './Heading';
import ImageGallarySlider from './ImageGallarySlider';
import ImageGallarySlider2 from './ImageGallarySlider2'


const ImageGallary = () => {
  return (
    <div>
     <Heading mainTitle={"@ FOLLOW US ON INSTAGRAM"} smallTitle={" "} className="text-[14px]"></Heading>
     <ImageGallarySlider></ImageGallarySlider>
     <ImageGallarySlider2></ImageGallarySlider2>
  
      
    </div>
  )
}

export default ImageGallary
