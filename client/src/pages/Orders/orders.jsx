import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Dialog,
    DialogHeader,
    DialogBody,
    Input,
} from "@material-tailwind/react";
import { AiOutlineClose } from 'react-icons/ai'

const orders = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen((cur) => !cur);

    useEffect(() => {
        // Fetch data from the API
        axios
            .get("http://localhost:4000/api/v1/orders/me", {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                }
            }).then((response) => {
                const { orders } = response.data;
                setOrders(orders);
            })
            .catch((error) => {
                alert(error.response.data.message);
                console.error("Failed to fetch orders:", error);
            });
    }, []);

    // Function to handle order click and set the selected order
    const handleOrderClick = (orderId) => {
        axios
            .get(`http://localhost:4000/api/v1/order/${orderId}`, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                }
            }).then((response) => {
                const { order } = response.data;
                setSelectedOrder(order);
                console.log(selectedOrder);
            })
            .catch((error) => {
                alert(error.response.data.message);
                console.error("Failed to fetch selected order:", error);
            });
    };
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleString(undefined, options);
    };

    return (
        <>
            <div className="lg:flex">
                <div className="lg:w-2/3 flex flex-col justify-center items-center m-2 lg:m-10 gap-2 lg:gap-4">
                    {orders.map((order) => (
                        <div key={order._id} className="relative border flex w-full gap-5 cursor-pointer" onClick={() => { handleOrderClick(order._id); handleOpen() }}>
                            {order.orderItems.map((item) => (
                                <div key={item._id} className="flex flex-col w-4/5 justify-evenly">
                                    <AiOutlineClose className="text-black absolute top-2 right-3"></AiOutlineClose>
                                    <img src={item.image} alt="" className="w-28 h-30" />
                                    <div>
                                        <h1 className="text-lg">{item.name}</h1>
                                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-2">
                                            <small>
                                                Address : <span>{order.shippingInfo.address}</span>
                                            </small>
                                            <small>
                                                Payment Status :{" "}
                                                <span className="text-green-500">
                                                    {order.paymentInfo.status}
                                                </span>
                                            </small>
                                            <small>
                                                Date : <span>{formatDate(order.paidAt)}</span>
                                            </small>
                                        </div>
                                        <div className="flex justify-between items-end">
                                            <span>Quantity : {item.quantity}</span>
                                            <span> Rs. {item.quantity*(item.price)}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {selectedOrder && (
                <Dialog size={"xl"} open={open} handler={handleOpen} className="bg-white shadow-none mx-0 h-[200vh] overflow-scroll ">
                    <div className="">
                        <DialogBody divider>
                            <div className="flex flex-col gap-[0.3rem]">
                                <Input color="pink" label="User Name" value={selectedOrder.user.name} readOnly />
                                <Input color="pink" label="User Mail" value={selectedOrder.user.email} readOnly />
                                <Input color="pink" label="Shipping Address" value={selectedOrder.shippingInfo.address} readOnly />
                                <Input color="pink" label="City" value={selectedOrder.shippingInfo.city} readOnly />
                                <Input color="pink" label="State" value={selectedOrder.shippingInfo.state} readOnly />
                                <Input color="pink" label="Country" value={selectedOrder.shippingInfo.country} readOnly />
                                <Input color="pink" label="Pin Code" value={selectedOrder.shippingInfo.pinCode} readOnly />
                                <Input color="pink" label="Phone Number" value={selectedOrder.shippingInfo.phoneNo} readOnly />
                                <Input color="pink" label="Payment Status" value={selectedOrder.paymentInfo.status} readOnly />
                                <Input color="pink" label="Paid At" value={formatDate(selectedOrder.paidAt)} readOnly />
                                <Input color="pink" label="Items Price" value={selectedOrder.itemsPrice} readOnly />
                                <Input color="pink" label="Tax Price" value={selectedOrder.taxPrice} readOnly />
                                <Input color="pink" label="Shipping Price" value={selectedOrder.shippingPrice} readOnly />
                                <Input color="pink" label="Total Price" value={selectedOrder.totalPrice} readOnly />
                                <Input color="pink" label="Order Status" value={selectedOrder.orderStatus} readOnly />
                            </div>
                        </DialogBody>
                    </div>
                </Dialog>
            )}
        </>
    );
}

export default orders