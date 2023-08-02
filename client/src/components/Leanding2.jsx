import ImagesForLeading2 from '../api/Leanding2';
import { Link } from "react-router-dom";


const FourImages = () => {
  return (


    <div className="md:flex grid grid-cols-2  xl:grid-cols-4 gap-2 m-2 sm:mt-5  sm:m-5  sm:w-[97vw] overflow-auto xl:flex md:scroll-snap-type-x md:mandatory scrollbar-hide">
      {
        ImagesForLeading2.map((element) => {
          return (
            <Link to={element.link} className=''>
            <div className="overflow-hidden className shadow-lg cursor-pointer relative overflow-y-hidden item flex-shrink-0 scroll-snap-align-start" key={element.id}>
              <img className="object-cover w-full h-[15rem] sm:h-[30rem] " src={element.img} alt="Flower and sky" />

              <button className="mx-auto bg-white hover:bg-black text-black  hover:text-white py-2 px-4 duration-500 hover:outline-none flex justify-center">
                {element.buttontext}
              </button>
              
            </div>
            </Link>

          )
        })
      }
    
    </div>


  )
}

export default FourImages