/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from "react";
import {
    Drawer,
    Typography,
    Button,
    IconButton,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { MdAddShoppingCart } from 'react-icons/md';
import { AiOutlinePlus, AiOutlineDelete } from 'react-icons/ai';
import { ProductContext } from "../pages/collectionDetails";
import { useNavigate } from "react-router-dom";
import { useCart } from '../CartContext';

const AddtoCart = ({ open, onClose, singleproductPrice }) => {

    const [productNetPrice, setproductNetPrice] = useState(singleproductPrice);
    const [productNetCount, setproductNetCount] = useState(0);
    const product = useContext(ProductContext);
    const navigate = useNavigate();
    const { cartItems, setCartItems } = useCart();

    const ClearAll = () => {
        setCartItems([]);
        setproductNetCount(0);
        setproductNetPrice(0);
    };


    const onIncrementItem = (productId) => {
        setCartItems((prevCartItems) =>
            prevCartItems.map((item) =>
                item.product._id === productId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    const onDecrementItem = (productId) => {
        setCartItems((prevCartItems) =>
            prevCartItems.map((item) =>
                item.product._id === productId && item.quantity > 0
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };


    useEffect(() => {
        // Calculate the total quantity and price of the cart items
        let totalQuantity = 0;
        let totalPrice = 0;

        cartItems.forEach((item) => {
            totalQuantity += item.quantity;
            totalPrice += item.quantity * item.product.price;
        });

        setproductNetCount(totalQuantity);
        setproductNetPrice(totalPrice);
    }, [cartItems]);

    // useEffect(() => {
    //     setproductNetPrice(currentProductCount * singleproductPrice);
    // }, [currentproductCount]);


    const handleCheckout = () => {
        // Navigate to the checkout page with the product object as state
        navigate("/checkout", {
            state: {
                product: product,
                cartItems: cartItems,
                productNetPrice: productNetPrice ,
                productNetCount :productNetCount
            },
        });
        window.location.href = '/checkout';
    };

    return (
        <Drawer placement="right" open={open} onClose={onClose} className="overflow-scroll">
            <div className="mb-2 flex items-center justify-between p-4 ">
                <Typography variant="h6">
                    SHOPPING CART
                </Typography>
                <IconButton variant="text" onClick={onClose}>
                    <XMarkIcon strokeWidth={2} className="h-5 w-5" />
                </IconButton>
            </div>
            {cartItems.length ? (
                <>
                    {cartItems.map((item) => (
                        <div key={item.product._id} className="flex gap-2">
                            <div className="w-2/5">
                                <img src={item.product.images[0].url} alt="Detailspage" className="m-3" />
                            </div>
                            <div className="w-3/5 m-3">
                                <div>{item.product.name.slice(0, 15) + '...'}</div>
                                <div className="text-[14px] text-gray-500">₹ {item.product.price * item.quantity} </div>
                                <button className="flex text-pink py-2 px-6 items-center justify-between gap-3 focus:outline-none rounded-full border border-black my-2">
                                    <AiOutlineDelete className="hover:text-pink-500" onClick={() => onDecrementItem(item.product._id)} />
                                    {item.quantity}
                                    <AiOutlinePlus className={`hover:text-pink-500 ${item.quantity === 0 ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={() => onIncrementItem(item.product._id)} />
                                </button>
                            </div>
                        </div>
                    ))}
                    <button className="flex text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none rounded-full hover:bg-pink-800 duration-300 hover:translate-y-2 m-auto" onClick={ClearAll}>
                        Clear All
                    </button>
                </>
            ) : (
                <div className="flex flex-col m-14">
                    <MdAddShoppingCart className="mx-12 h-20 w-20" />
                    <p className="mx-4">Your cart is empty.</p>
                    <Button color="pink" className="rounded-xl" onClick={onClose}>
                        RETURN TO SHOP
                    </Button>
                </div>
            )}
            <div className="subtotal bottom-0 absolute bg-white p-4 border-t-2">
                <button className="flex text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none rounded-full hover:bg-pink-800 duration-300 hover:translate-y-2 my-4 justify-center items-center w-full" onClick={handleCheckout}>
                    Check Out
                </button>
            </div>
        </Drawer>
    );
}

export default AddtoCart