import { useState } from "react";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { Link } from "react-router-dom";

const Carousel = () => {
    const images = [
        "./images/leanding1.jpg",
        "./images/leanding2.jpg",
        "./images/leanding3.jpg",
        "./images/leanding4.jpg"
    ];

    const mobileImages = [
        "./images/leandingMobile1.jpg",
        "./images/leandingMobile2.jpg",
        "./images/leandingMobile3.jpg",
        "./images/leandingMobile4.jpg"
    ];

    const [currentImage, setCurrentImage] = useState(0);

    const nextSlide = () => {
        setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const goToSlide = (index) => {
        setCurrentImage(index);
    };
    return (
        <>
            {/* for mobile size */}
            <div className="w-full flex sm:hidden items-center justify-center ">
                <Link to='/collections'>
                    <img
                        src={mobileImages[currentImage]}
                        alt="Carousel Slide"
                        className="w-full"
                    />
                </Link>


                <div>
                    <button
                        onClick={prevSlide}
                        className="absolute left-1 bg-gray-500 hover:bg-pink-700   font-bold py-2 px-2 rounded-full"
                    >
                        <GrFormPrevious className="text-xl md:text-4xl hover:text-gray-500 text-gray-700" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-1 bg-gray-500 hover:bg-pink-700   font-bold py-2 px-2 rounded-full"
                    >
                        <GrFormNext className="text-xl md:text-4xl hover:text-gray-500 text-gray-700" />
                    </button>
                </div>
                <div className="mt-4 flex justify-center items-center absolute bottom-48">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`mx-1 w-3 h-3 rounded-full ${currentImage === index ? "bg-gray-200" : "bg-gray-700"
                                }`}
                        ></button>
                    ))}

                </div>
            </div>
            {/* greater or equal to sm size */}
            <div className="w-full sm:flex hidden items-center justify-center ">
                <img
                    src={images[currentImage]}
                    alt="Carousel Slide"
                    className="w-full"
                />


                <div>
                    <button
                        onClick={prevSlide}
                        className="absolute left-1 bg-gray-500 hover:bg-pink-700   font-bold py-2 px-2 rounded-full"
                    >
                        <GrFormPrevious className="text-xl md:text-4xl hover:text-gray-500 text-gray-700" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-1 bg-gray-500 hover:bg-pink-700   font-bold py-2 px-2 rounded-full"
                    >
                        <GrFormNext className="text-xl md:text-4xl hover:text-gray-500 text-gray-700" />
                    </button>
                </div>
                <div className="mt-4 flex justify-center items-center absolute bottom-0 xl:-bottom-1">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`mx-1 w-3 h-3 rounded-full ${currentImage === index ? "bg-gray-200" : "bg-gray-700"
                                }`}
                        ></button>
                    ))}

                </div>
            </div>
        </>
    );
};

export default Carousel;





