import { BsFilterCircle } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import {
  Drawer,
  Typography,
  IconButton,
  Card,
  CardFooter,
  Button,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LehengaCholiCollection = () => {
  const [open, setOpen] = useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const [value, setValue] = useState(12000);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [count, setCount] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/products?page=${count}&category=LehengaCholi`
        );
        setFilteredProducts(response.data.products);
        // setLoading(false);
        console.log(response.data);
      } catch (error) {
        alert(error.response?.data?.message || "Failed to fetch products.");
        console.error("Failed to fetch products:", error);
        // setLoading(false);
      }
    };

    fetchData();
  }, [count]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const filterProduct = () => {
    setOpen(false);
    const filteredProducts = filteredProducts.filter(
      (product) => product.price <= value
    );
    setFilteredProducts(filteredProducts);
  };
  return (
    <Card className="h-full w-full">
      <div className="h-20 sm:h-28 w-full bg-gray-600 box-content"></div>
      <div className="flex m-5 gap-2 text-gray-600"> <BsFilterCircle className="text-2xl cursor-pointer" onClick={openDrawer} /><span>Filter</span> </div>
      <Drawer open={open} onClose={closeDrawer} className="p-4">
        <div className="mb-6 flex items-center justify-between border-b-2">
          <Typography variant="h5" color="blue-gray">
            Filter Products
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <XMarkIcon strokeWidth={2} className="h-5 w-5" />
          </IconButton>
        </div>
        <span>Price</span>
        <div className="w-60 sliderContainer bg-white rounded-10px shadow-sm">
          <input
            type="range"
            min={1000}
            max={12000}
            value={value}
            onChange={handleChange}
            className="w-full h-1 bg-pink-300 appearance-none outline-none rounded-10px cursor-pointer thumb:bg-green-500"
          />
          <p className="text-center mt-2">Value: {value}</p>
        </div>
        <button className="flex text-white bg-pink-500 border-0 my-4 py-2 px-6 focus:outline-none rounded-full hover:bg-pink-800 duration-300 hover:translate-y-2 m-auto" onClick={filterProduct}>Filter Product</button>
      </Drawer>

      {(filteredProducts.length > 0) ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-10 m-5 sm:w-[97vw] mt-5 xl:mt-10 ">
          {filteredProducts.map((element) => {
            return (
              <div className='ease-in-out cursor-pointer h-full min-h-[18rem] w-full md:w-[18rem] lg:w-full md:h-[30.5rem] xl:h-[43rem] overflow-hidden relative' key={element.id}>
                <img alt="team" className="flex-shrink-0 viol object-center mb-4  ease-in-out object-cover h-full min-h-[18rem] w-full md:w-[18rem] lg:w-full  md:h-[30.5rem] xl:h-[43rem] hover:scale-110 duration-700 " src={element.images[0].url} />
                <button
                  onClick={() => navigate("/collections/details", { state: { productId: element._id } })}
                  className="absolute bottom-5 sm:bottom-20 left-5 sm:left-20 bg-pink-500 border-0 my-4 py-2 px-6 focus:outline-none rounded-full hover:bg-pink-800 duration-300 hover:translate-y-2"
                >
                  View Details
                </button>
                <div className="absolute bottom-5 sm:bottom-36 left-5 sm:left-20 bg-white p-2 rounded-lg shadow-md">
                  <div>{element.buttonText}</div>
                  <div>{element.name} </div>
                  <div>Price : {element.price} ₹</div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="h-[50vh] w-[100vw] flex items-center justify-center text-5xl">Nothing..</div>
      )}
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page {count}
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" color="blue-gray" size="sm" onClick={() => { setCount(count - 1) }}>
            Previous
          </Button>
          <Button variant="outlined" color="blue-gray" size="sm" onClick={() => { setCount(count + 1) }}>
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default LehengaCholiCollection