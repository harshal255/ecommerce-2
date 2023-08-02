import { AiOutlineClose } from 'react-icons/ai'
import { useEffect, useState } from "react"
import { AiFillDelete } from "react-icons/ai";
import { PencilIcon } from "@heroicons/react/24/solid";
import axios from "axios"

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [userName, setUserName] = useState(new Map());

    const handleUpdateOrder = async (orderId) => {

        const newStatus = prompt();

        // Check if newStatus is null (i.e., user clicked "Cancel")
        if (newStatus === null) {
            return; // Don't proceed with the update
        }

        const updateStatusUrl = `http://localhost:4000/api/v1/admin/order/${orderId}`;

        try {
            await axios.put(updateStatusUrl, { status: newStatus }, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            });
            alert("Status updated successfully!");
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order._id === orderId ? { ...order, orderStatus: newStatus } : order
                )
            );
        }
        catch (error) {
            alert("Failed to update Status: " + error.response.data.message);
            console.error("Failed to update status:", error);
        }
    }
    const handleDeleteOrder = async (orderId) => {

        const updateStatusUrl = `http://localhost:4000/api/v1/admin/order/${orderId}`;

        try {
            await axios.delete(updateStatusUrl, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            });
            alert("Deletion successfully!");
            setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
        }
        catch (error) {
            alert("Failed to Delete " + error.response.data.message);
            console.error("Failed to delete", error);
        }
    }

    const fetchUser = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:4000/api/v1/admin/user/${userId}`, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response.data.user.name;
        } catch (error) {
            console.error('Failed to fetch user:', error);
            return 'Unknown'; // Set a default name for failed fetches
        }
    };

    useEffect(() => {
        axios
            .get("http://localhost:4000/api/v1/admin/orders", {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then(async (response) => {
                const { orders } = response.data;
                setOrders(orders);

                // Get unique user IDs from the orders
                const uniqueUserIds = Array.from(new Set(orders.map((order) => order.user)));

                // Fetch user names for unique user IDs
                const userNamesMap = new Map();
                for (const userId of uniqueUserIds) {
                    const userName = await fetchUser(userId);
                    userNamesMap.set(userId, userName);
                }

                setUserName(userNamesMap);
            })
            .catch((error) => {
                alert(error.response.data.message);
                console.error("Failed to fetch orders:", error);
            });
    }, []);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleString(undefined, options);
    };

    return (
        <div className="lg:flex justify-center">
            <div className="lg:w-2/3 flex flex-col justify-center items-center m-2 lg:m-10 gap-2 lg:gap-4">
                {orders.map((order) => (
                    <div className="border flex w-full gap-5 relative" key={order._id}>
                        {order.orderItems.map((item) => (
                            <div className="flex flex-col w-4/5 justify-evenly" key={item._id}>
                                <img src={item.image} alt="" className="w-28 h-30" />
                                <h1 className="text-lg">{item.name}</h1>
                                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-2">
                                    <small>Address: <span>{order.shippingInfo.address}</span></small>
                                    <small>Payment Status: <span className="text-green-500">{order.paymentInfo.status}</span></small>
                                    <small>Date: <span>{formatDate(order.cretedAt)}</span></small>
                                    <small>Delivery Status: <span>{order.orderStatus}</span></small>
                                    <small>User Name: <span>{userName.get(order.user)}</span></small>
                                </div>
                                <div className="flex justify-between items-end">
                                    <span>Total: {order.totalPrice}</span>
                                    <div className="flex gap-2">
                                        <PencilIcon className="w-5 h-5 cursor-pointer text-gray-600 hover:text-blue-500" onClick={() => handleUpdateOrder(order._id)} />
                                        <AiFillDelete className="w-5 h-5 cursor-pointer text-red-600 hover:text-red-500" onClick={() => handleDeleteOrder(order._id)} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminOrders