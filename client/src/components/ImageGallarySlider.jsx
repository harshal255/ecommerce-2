
import GalleryImage from '../api/ImageGallary';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/Slider.css";


const ImageGallarySlider = () => {

    // console.log(GalleryImage);

    const settings = {
        dots: false,
        infinite: false,
        speed: 400,
        slidesToShow: 5,
        slidesToScroll: 1,

        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                    // infinite: true,
                    // dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    // initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ],

    };
    return (
        <Slider {...settings} >
            {
                GalleryImage.map((gallery) => {
                    return (
                        <div key={gallery.id} className="lg:w-1/6 h-[14rem] md:h-[25rem] w-1/2 mt-5 lg:mt-10  overflow-hidden" >
                            <div className='ease-in-out md:hover:scale-110 hover:scale-125 cursor-pointer duration-1000'>
                                <a href={gallery.link} target="_blank" rel="noreferrer">
                                    <img alt="team" className="flex-shrink-0 viol object-cover object-center mb-4 transition-opacity transform-none duration-500 ease-in-out" src={gallery.img} />
                                </a>
                            </div>
                        </div>

                    )

                })
            }


        </Slider>
    )
}

export default ImageGallarySlider
