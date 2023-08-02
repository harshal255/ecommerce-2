import { useContext, useEffect, useState } from 'react'
import './App.css'
import Footer from './components/Footer'
import NavbarCom from './components/Navbar'
import NavbarMenu from './components/navbarMenu'
import MobileFooter from './components/MobileFooter'
import { Routes, Route } from 'react-router-dom'
import NoMatch from './components/NoMatch'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgetPassword from './pages/ForgetPassword'
import CollectionDetails from './pages/collectionDetails'
import CheckoutForm from './pages/CheckoutForm'
import AdminPanel from './pages/Admin/AdminPanel'
import CreateProduct from './pages/Admin/createProduct'
import AuthContext, { AuthProvider } from './AuthContext';
import Orders from './pages/Orders/orders'
import UserDetails from './components/userdetail'
import TopCollections from './pages/TopCollections'
import GownCollections from './pages/GownCollections'
import SareesCollections from './pages/SareesCollections'
import LehengaCholiCollections from './pages/LehengaCholiCollections'
import UpdateProduct from './pages/Admin/UpdateProduct'
import { CartProvider } from './CartContext'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppRoutes />
      </CartProvider>
    </AuthProvider>
  );
}

function AppRoutes() {
  const { isLoggedIN, fetchUserProfile } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      if (isLoggedIN) {
        try {
          const userProfile = await fetchUserProfile();
          setUserDetails(userProfile);
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      }
    };

    fetchData();
  }, []);

  const isAdmin = userDetails?.role === 'admin';
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <NavbarCom />
              <Home />
              <MobileFooter />
              <Footer />
            </>
          }
        ></Route>
        <Route
          path="/LehengaCholiCollections"
          element={
            <>
              <NavbarCom />
              <LehengaCholiCollections />
              <MobileFooter />
              <Footer />
            </>
          }
        ></Route>
        <Route
          path="/SareesCollections"
          element={
            <>
              <NavbarCom />
              <SareesCollections />
              <MobileFooter />
              <Footer />
            </>
          }
        ></Route>
        <Route
          path="/GownCollections"
          element={
            <>
              <NavbarCom />
              <GownCollections />
              <MobileFooter />
              <Footer />
            </>
          }
        ></Route>
        <Route
          path="/TopCollections"
          element={
            <>
              <NavbarCom />
              <TopCollections />
              <MobileFooter />
              <Footer />
            </>
          }
        ></Route>
        <Route
          path="/user"
          element={
            <>
              <NavbarCom />
              <UserDetails />
              <MobileFooter />
              <Footer />
            </>
          }
        ></Route>
        <Route
          path="/collections/details"
          element={
            <>
              <NavbarCom />
              <CollectionDetails />
              <MobileFooter />
              <Footer />
            </>
          }
        ></Route>
        {isAdmin && (
          <Route
            path="/admin"
            element={
              <>
                <NavbarCom />
                <AdminPanel />
                <MobileFooter />
                <Footer />
              </>
            }
          ></Route>
        )}
        {isAdmin && (
          <Route
            path="/admin/createProduct"
            element={
              <>
                <NavbarCom />
                <CreateProduct />
                <MobileFooter />
                <Footer />
              </>
            }
          ></Route>
        )}
        {isAdmin && (
          <Route
            path="/admin/Updateproduct"
            element={
              <>
                <NavbarCom />
                <UpdateProduct />
                <MobileFooter />
                <Footer />
              </>
            }
          ></Route>
        )}
        <Route
          path="/login"
          element={
            <>
              <NavbarCom />
              <Login />
              <MobileFooter />
              <Footer />
            </>
          }
        ></Route>
        <Route
          path="/register"
          element={
            <>
              <NavbarCom />
              <Register />
              <MobileFooter />
              <Footer />
            </>
          }
        ></Route>
        <Route
          path="/recover"
          element={
            <>
              <NavbarCom />
              <ForgetPassword />
              <MobileFooter />
              <Footer />
            </>
          }
        ></Route>
        <Route
          path="/orders"
          element={
            <>
              <NavbarCom />
              <Orders />
              <MobileFooter />
              <Footer />
            </>
          }
        ></Route>
        <Route
          path="/checkout"
          element={<CheckoutForm />}
        ></Route>
        <Route
          path="*"
          element={
            <>
              <NavbarCom />
              <NoMatch />
              <MobileFooter />
              <Footer />
            </>
          }
        ></Route>
      </Routes >
    </>
  );
}

export default App;
