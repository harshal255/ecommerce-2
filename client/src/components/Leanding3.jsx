import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import '../css/Leanding3.css';



const Leanding3 = () => {
  
    const navigate = useNavigate();

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 m-2 sm:mt-5 sm:w-[97vw]">
            <div className="overflow-hidden className shadow-lg cursor-pointer ">
                <img className="object-cover w-full md:h-[25rem] xl:h-[37.5rem] hidden md:inline-block" src="./images/leanding3_img_1.webp" alt="Flower and sky" />
            </div>

            <div className="relative">
                <div className="overflow-hidden shadow-lg cursor-pointer relative overflow-y-hidden group">
                    <div className="hover:scale-110 duration-1000 ease-in-out">
                        <img className="object-cover w-full md:h-[27.5rem] xl:h-[40rem] transition-opacity transform-none duration-1000 ease-in-out" src="./images/leanding3_img_2_1.webp" alt="Flower and sky" />

                        <div className="absolute top-0 left-0 opacity-0 transition-opacity group-hover:opacity-100 duration-1000 ease-in-out secondContainer">
                            <img className="object-cover w-full md:h-[27.5rem] xl:h-[40rem] " src="./images/leanding3_img_2.webp" alt="Flower and sky" />
                            <div>
                                <div className="iconsCol absolute top-6 left-6  p-2 opacity-100 hover:opacity-100 transition-opacity duration-300">
                                </div>
                                <div className="cardButtons absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 flex flex-col gap-3">
                                    <a href='/collections/details'>
                                        <button className="rounded-full font-extralight text-sm bg-white text-gray-900 py-2 px-5 flex items-center flex-col hover:bg-gray-900 hover:text-white"
                                        onClick={()=>{navigate("/collections/details", { state: { productId: "64bbe202e62e95accd81692a" } });}}
                                        >
                                            <span>Quick Shop</span>
                                            <AiOutlineShoppingCart className="w-6 h-6" />
                                        </button>
                                    </a>
                                </div>
                                <div className="cardFooter  text-center absolute bottom-12 left-16 right-16 transform transition-opacity flex flex-col items-center text-white text-sm xl:text-base">
                                    <p className=' hover:text-black duration-700'>
                                        Pista Color Thread Embroidery Work With Lace Border Organza Lehenga Choli
                                    </p>
                                    <span> ₹ 4,600.00 - ₹ 5,400.00</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <div className="overflow-hidden className shadow-lg cursor-pointer md:inline-block hidden ">
                <img className="object-cover w-full md:h-[25rem] xl:h-[37.5rem]" src="./images/leanding3_img_3.webp" alt="Flower and sky" />
            </div>
        </div>
    )
}

export default Leanding3
