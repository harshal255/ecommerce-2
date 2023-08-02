/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react';
import Heading from './Heading';
import Products from '../api/OurProducts';
import { AiOutlineHeart, AiOutlineEye, AiOutlineShoppingCart } from 'react-icons/ai';
import { TbArrowsCross } from 'react-icons/tb';
import '../css/OurProducts.css';
import { Link } from 'react-router-dom';


const OurProducts = () => {

  
  const carouselRef = useRef(null); 
  const handlePrevSlide = () => {
    carouselRef.current.scrollLeft -= carouselRef.current.offsetWidth;
  };

  const handleNextSlide = () => {
    carouselRef.current.scrollLeft += carouselRef.current.offsetWidth;
  };
  return (
    <div className=''>
      <Heading mainTitle={"OUR PRODUCTS"} smallTitle={"Top sale in this week"}></Heading>
      <div className="flex grid-cols-2 xl:grid-cols-4 gap-2 md:gap-5 m-2 sm:mt-5 sm:w-[97vw] overflow-auto xl:flex scroll-snap-type-x mandatory scrollbar-hide">
        {Products.BestSellerProducts.map((product) => (
          <div key={product.id} className='item flex-shrink-0 scroll-snap-align-start'>
            <div className="relative w-[12rem] xl:w-[25rem]">
              <div className="overflow-hidden shadow-lg cursor-pointer relative overflow-y-hidden group">
                <div className="hover:scale-110 duration-1000 ease-in-out">
                  <img className="object-cover w-full  xl:h-[32rem] transition-opacity transform-none duration-1000 ease-in-out" src={product.img} alt="Flower and sky" />

                  <div className="absolute top-0 left-0 opacity-0 transition-opacity group-hover:opacity-100 duration-1000 ease-in-out secondContainer">
                    <img className="object-cover w-full   xl:h-[32rem] " src={product.img_hover} alt="Flower and sky" />
                    <div>
                      <div className="iconsCol absolute top-0 left-0 sm:top-6 sm:left-6 p-1 opacity-100 hover:opacity-100 transition-opacity duration-300 m-2">
                      </div>
                      <div className="cardButtons absolute -bottom-3 -right-1 sm:top-1/2 sm:left-1/2 sm:bottom-auto sm:right-auto transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 flex flex-col sm:gap-3  bg-white sm:bg-transparent rounded-full">
                        <Link to='/collections/details'>

                          <button className="rounded-full font-extralight text-sm bg-white text-gray-900 py-2 px-2 sm:px-5 flex items-center flex-col hover:bg-gray-900 hover:text-white">
                            <AiOutlineShoppingCart className="h-[16px] w-[16px] sm:w-6 sm:h-6" />
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="cardFooter md:m-2 m-0 text-center text-black  transform transition-opacity flex flex-col items-center text-[12px] md:text-sm ">
                <p className=' hover:text-blue-900 duration-700'>
                  {product.description}
                </p>
                <span>{product.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OurProducts
