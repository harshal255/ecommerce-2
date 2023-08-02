import { Link, useNavigate } from "react-router-dom";
import { AiOutlineHeart, AiOutlineDelete } from 'react-icons/ai';
import { TbArrowsCross } from 'react-icons/tb';
import { RxUpdate } from 'react-icons/rx';
import { IoCreateOutline } from 'react-icons/io5';
import { useState, useEffect } from "react";
import axios from "axios";
import { Card, Typography, Button, CardFooter } from "@material-tailwind/react";

const AdminProducts = () => {
  const [count, setCount] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from the API
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/products?page=${count}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setProducts(response.data.products);
        setLoading(false);
        console.log(response.data);
      } catch (error) {
        alert(error.response?.data?.message || "Failed to fetch products.");
        console.error("Failed to fetch products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [count]);

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/v1/product/${productId}`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert('Product deleted successfully!');
      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
      console.log(response);
    } catch (error) {
      alert('Failed to delete Product: ' + error.response.data.message);
      console.error('Failed to delete user:', error);
    }
  };
  return (
    <div className="Products">
      <Link to="/admin/createProduct" className="flex m-5 gap-2 text-gray-600 items-center">
        <IoCreateOutline></IoCreateOutline>
        <span>Create Product</span>
      </Link>
      <Card className="h-full w-full">
        <div className="grid grid-cols-4 md:grid-cols-4 gap-3 sm:w-[97vw] mt-5 xl:mt-10 ">
          {loading ? (
            <div>Loading...</div>
          ) : (
            products.map((product) => (
              <div className="relative w-[10rem] xl:w-[22.5rem] mx-2" key={product._id}>
                <div className="overflow-hidden shadow-lg cursor-pointer relative overflow-y-hidden group">
                  <div className="hover:scale-110 duration-1000 ease-in-out">
                    <img className="object-cover w-full  xl:h-[32rem] transition-opacity transform-none duration-1000 ease-in-out" src={product.images[0].url} alt="Product" />
                    <div className="absolute top-0 left-0 opacity-0 transition-opacity group-hover:opacity-100 duration-1000 ease-in-out secondContainer">
                      <img className="object-cover w-full   xl:h-[32rem] " src={product.images[0].url} alt="Product" />
                      <div>
                        <div className="iconsCol absolute top-0 left-0 sm:top-6 sm:left-6 p-1 opacity-100 hover:opacity-100 transition-opacity duration-300 m-2">
                          <AiOutlineHeart className="h-[16px] w-[16px] sm:w-6 sm:h-6 text-white m-1" />
                          <TbArrowsCross className="h-[16px] w-[16px] sm:w-6 sm:h-6 text-white m-1" />
                        </div>
                        <div className="cardButtons absolute -bottom-3 -right-1 sm:top-1/2 sm:left-1/2 sm:bottom-auto sm:right-auto transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 flex flex-col sm:gap-3  bg-white sm:bg-transparent rounded-full">
                          <button
                            className="rounded-full font-extralight text-sm bg-white text-gray-900 hover:bg-gray-900 hover:text-white py-2 px-2 sm:px-5 flex items-center flex-col group1"
                          >
                            <RxUpdate className="h-[16px] w-[16px] sm:w-6 sm:h-6" onClick={() => { navigate('/admin/Updateproduct', { state: { productId: product._id } }) }} />
                          </button>
                          <button className="rounded-full font-extralight text-sm bg-white text-gray-900 py-2 px-2 sm:px-5 flex items-center flex-col hover:bg-gray-900 hover:text-white">
                            <AiOutlineDelete className="h-[16px] w-[16px] sm:w-6 sm:h-6" onClick={() => handleDeleteProduct(product._id)} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="cardFooter md:m-2 m-0 text-center text-black  transform transition-opacity flex flex-col items-center text-[12px] md:text-sm ">
                  <p className="hover:text-blue-900 duration-700">{product.description}</p>
                  <span>Price: {product.price}</span>
                  <span>Stock: {product.stock}</span>
                </div>
              </div>
            ))
          )}
        </div>
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
    </div>
  )
}
export default AdminProducts