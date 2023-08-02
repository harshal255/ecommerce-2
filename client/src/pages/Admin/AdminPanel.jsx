import Heading from "../../components/Heading";
import { useState } from 'react'
import AdminDashboard from "./AdminDashboard";
import AdminOrders from "./AdminOrders";
import AdminProducts from "./AdminProducts";
import AdminUsers from "./AdminUsers";


const AdminPanel = () => {

  const [selectedButton, setSelectedButton] = useState('users');
  const handleButtonClick = (buttonName) => {
    // console.log("Button is selected" + buttonName);
    setSelectedButton(buttonName);
  };
  return (

    <div>
      <Heading mainTitle={"Admin Panel"} smallTitle={"View, Delete & Edit user as well as Product"}></Heading>
      <AdminDashboard></AdminDashboard>
      <div className="buttons text-center">
        <button
          className={`bg-white  py-2 px-5 m-2 md:m-4 hover:text-black hover:border-2 hover:border-black duration-400
           ${selectedButton === 'users' ? 'text-black border-2 border-black' : 'text-gray-800 border-2 border-transparent'}  
           `}
          onClick={() => handleButtonClick('users')}
        >
          Users
        </button>
        <button
          className={`bg-white py-2 px-5 m-2 md:m-4 hover:text-black hover:border-2 hover:border-black duration-400 
          ${selectedButton === 'products' ? 'text-black border-2 border-black' : 'text-gray-800 border-2 border-transparent'}  
          `}
          onClick={() => handleButtonClick('products')}
        >
          Products
        </button>
        <button
          className={`bg-white py-2 px-5 m-2 md:m-4 hover:text-black hover:border-2 hover:border-black duration-400 
          ${selectedButton === 'orders' ? 'text-black border-2 border-black' : 'text-gray-800 border-2 border-transparent'}  
          `}
          onClick={() => handleButtonClick('orders')}
        >
          Orders
        </button>
      </div>
      {
        selectedButton === 'users' ?
          <AdminUsers /> : selectedButton === 'products' ? <AdminProducts /> :
            <AdminOrders />
      }
    </div>
  )
}

export default AdminPanel