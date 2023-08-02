/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, createContext } from "react";
import { AiOutlineHeart, AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import AddtoCart from "../components/AddtoCart";
import CustomerReview from "../components/CustomerReview";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useCart } from '../CartContext';

export const ProductContext = createContext();

const collectionDetails = () => {

    const location = useLocation();
    const productId = location.state?.productId;
    // console.log(productId);

    const { cartItems, setCartItems } = useCart();

    const [product, setProduct] = useState(null);

    const [openNav, setOpenNav] = useState(false);
    const [openSearch, setOpenSearch] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);
    const [openBag, setOpenBag] = useState(false);
    const [openNavbar, setOpenNavbar] = useState(false);
    const [open, setOpen] = useState(0);
    const [selected, SetIsSelected] = useState("All Categories");
    const [counter, setCounter] = useState(1);
    const [singleprice, setSingleprice] = useState(0);
    const [price, setPrice] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/v1/product/${productId}`);
                setSingleprice(response.data.product.price);
                setPrice(counter * response.data.product.price);
                setProduct(response.data.product);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch product:', error);
                alert('Failed to fetch Product: ' + error.response.data.message);
                setLoading(false);
            }
        };

        fetchProduct();
    }, []);

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    const setSelected = (value) => {
        SetIsSelected(value);
    }
    // const openDrawerNavbar = () => {
    //     setOpenNavbar(true);
    //     document.body.style.overflow = "hidden";
    //     document.body.style.height = "100vh";

    // }
    // const closeDrawerNavbar = () => {
    //     setOpenNavbar(false);
    //     document.body.style.overflow = "";
    //     document.body.style.height = "";

    // }
    // const openDrawerSearch = () => {
    //     setOpenSearch(true);
    //     document.body.style.overflow = "hidden";
    //     document.body.style.height = "100vh";

    // }
    // const closeDrawerSearch = () => {
    //     setOpenSearch(false);
    //     document.body.style.overflow = "";
    //     document.body.style.height = "";

    // }
    // const openDrawerLogin = () => {
    //     setOpenLogin(true);
    //     document.body.style.overflow = "hidden";
    //     document.body.style.height = "100vh";
    // }
    // const closeDrawerLogin = () => {
    //     setOpenLogin(false);
    //     document.body.style.overflow = "";
    //     document.body.style.height = "";
    // }
    const handleAddToCart = () => {
        if (counter <= 0) {
            // If the counter is 0 or negative, don't add the item to the cart
            return;
        }

        const cartItem = {
            product: product,
            quantity: counter,
        };

        // Check if the product is already in the cart
        const existingCartItem = cartItems.find((item) => item.product._id === product._id);

        if (existingCartItem) {
            // If the product is already in the cart, update its quantity
            setCartItems((prevCartItems) =>
                prevCartItems.map((item) =>
                    item.product._id === product._id ? { ...item, quantity: counter } : item
                )
            );
        } else {
            // If the product is not in the cart, add it as a new item
            setCartItems((prevCartItems) => [...prevCartItems, cartItem]);
        }
        setOpenBag(true);
        document.body.style.overflow = "hidden";
        document.body.style.height = "100vh";
    };

    const closeDrawerBag = () => {
        setOpenBag(false);
        document.body.style.overflow = "";
        document.body.style.height = "";
    }

    const handleIncrement = () => {
        setCounter(counter + 1);
    };

    const handleDecrement = () => {
        if (counter > 0) {
            setCounter(counter - 1);

        }
    };

    useEffect(() => {
        window.addEventListener("resize", () => window.innerWidth >= 960 && setOpenNav(false));
    }, []);

    useEffect(() => {
        setPrice(counter * singleprice);
    }, [singleprice, counter]);

    // useEffect hook to log cartItems after state update
    useEffect(() => {
        console.log("Cart Items:", cartItems);
    }, [cartItems, counter]);
    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <ProductContext.Provider value={product}>
                    <>
                        <div className="flex flex-col md:flex-row lg:my-5 md:gap-1 lg:gap-5 mt-5">
                            {product && (
                                <div className="md:w-1/2">
                                    <img src={product.images[0].url} alt="Detailspage" className="m-auto my-2 sm:w-1/2" />
                                </div>
                            )}

                            {product && (
                                <div className="md:w-1/2 w-full lg:pl-10 lg:py-[5rem] mt-6 lg:mt-0 sm:mx-5 px-5">
                                    <h2 className="text-sm title-font text-gray-500 tracking-widest">{product.category}</h2>
                                    <h1 className="text-gray-900 text-3xl title-font font-semibold mb-1">{product.name}</h1>

                                    <p className="leading-relaxed ">{product.description}</p>

                                    <span className="title-font font-medium text-2xl text-gray-900">₹{price}</span>
                                    <div className="flex mt-4 gap-2">
                                        <button className="flex text-pink py-2 px-6 items-center justify-between gap-3 focus:outline-none rounded-full border border-black ">
                                            <AiOutlineMinus
                                                className={`hover:text-pink-500 ${counter === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                onClick={handleDecrement}
                                            />
                                            {counter}
                                            <AiOutlinePlus className="hover:text-pink-500" onClick={handleIncrement} />
                                        </button>
                                        <button
                                            className="flex text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none rounded-full hover:bg-pink-800 duration-300 hover:translate-y-2"
                                            onClick={handleAddToCart}
                                        >
                                            Add to Cart
                                        </button>
                                        <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500">
                                            <AiOutlineHeart className="text-pink-500" />
                                        </button>
                                    </div>
                                    <h2 className="text-sm title-font text-gray-500 tracking-widest my-2">
                                        First Select or Update product Quality & then AddtoCart
                                    </h2>
                                </div>
                            )}
                            {/* AddtoCart Component */}
                            {product && (
                                <AddtoCart open={openBag} onClose={closeDrawerBag} singleproductprice={singleprice}/>
                            )}
                        </div>
                        {product._id && <CustomerReview pid={product._id} />}
                    </>
                </ProductContext.Provider>
            )};
        </>
    );
}

export default collectionDetails