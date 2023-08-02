
import Blogs from '../api/LatestBlog';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/Slider.css"

const LatestBlogSlider = () => {
    // console.log(Blogs);
   

    const settings = {
        dots: false,
        infinite: false,
        speed: 400,
        slidesToShow: 3,
        slidesToScroll: 1,
        // prevArrow: <button className="slick-prev slick-arrow ">
        // <span className="custom-prev-icon text-white"><GrFormNext className='text-white'></GrFormNext></span>
        // </button>,
        // nextArrow: <button className="slick-next slick-arrow">
        // <span className="custom-next-icon"><GrFormPrevious className='text-white '></GrFormPrevious></span>
        // </button>,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ],
        //dot buttons styles:-
        // appendDots: dots => (
        //     <ul style={{ margin: "0px", paddingLeft: "0px" }}>
        //         {dots.map((dot, index) => (
        //             <li key={index} style={{ display: "inline-block", marginRight: "10px" }}>
        //                 {dot}
        //             </li>
        //         ))}
        //     </ul>
        // ),
        // customPaging: i => (
        //     <div
        //         style={{
        //             width: "10px",
        //             height: "10px",
        //             borderRadius: "50%",
        //             backgroundColor: i === settings.currentSlide ? "#000000" : "#a3a3a3"
        //         }}
        //     />
        // )
    };
    return (

        <Slider {...settings} className='xl:mx-[50px]'>
            {
                Blogs.map((blog) => {
                    return (
                        <div key={blog.id} className="p-4 lg:w-1/3 md:w-1/2 group" >
                            <div className="h-full flex flex-col items-center text-center ">
                                <img alt="team" className="flex-shrink-0  viol w-full h-full object-cover object-center mb-4 transition-opacity transform-none duration-500 ease-in-out" src={blog.img} />
                                <div className="card absolute bg-white w-[20rem] xl:w-[28rem] h-[13rem] xl:h-[19rem] mb-4 border border-gray-300 flex flex-col gap-1 justify-center items-start px-5 xl:px-10 opacity-0 transition-opacity group-hover:opacity-100 duration-500 ease-in-out">
                                    <p className='text-gray-600'> By <span className="text-black">{blog.author}</span> A on  <span className="text-black">{blog.date}</span>  </p>
                                    <h5 className='hover:text-pink-500 duration-300'>{blog.title}</h5>
                                    <p className='text-[14px] text-gray-600 text-start '>{blog.descriptionTitle.slice(0,100)}...</p>
                                </div>

                            </div>
                        </div>
                    )


                })
            }

        </Slider>
    )
}

export default LatestBlogSlider
