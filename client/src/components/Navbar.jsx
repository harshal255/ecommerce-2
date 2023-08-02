/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import { ShoppingBasket } from '@mui/icons-material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import { green } from '@mui/material/colors';
import Cookies from 'js-cookie';

import {
    Input,
    Drawer,
    Navbar,
    Typography,
    Button,
    IconButton,
    Collapse,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
    Select,
    Option

} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,

} from "@heroicons/react/24/solid";
import '../css/navbar.css';
import axios from "axios";
import { FaFacebookF, FaPinterestP, FaTelegram } from 'react-icons/fa';
import { IoIosSearch } from 'react-icons/io';
import { VscAccount } from 'react-icons/vsc';
import { MdMail } from 'react-icons/md';
import { AiOutlineHeart, AiFillHeart, AiOutlineShoppingCart } from 'react-icons/ai';
import { CgShoppingBag } from 'react-icons/cg';
import { GiHamburgerMenu } from 'react-icons/gi'
import { FiHelpCircle } from 'react-icons/fi';
import { Link, useNavigate } from "react-router-dom";
import AddtoCart from "./AddtoCart";
import AuthContext from "../AuthContext";

export default function NavbarCom() {

    const { isLoggedIN, setIsLoggedIn } = useContext(AuthContext);
    const [openNav, setOpenNav] = useState(false);
    const [openSearch, setOpenSearch] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);
    const [openBag, setOpenBag] = useState(false);
    const [heartCount, setHeartCount] = useState(0);
    const [bagCount, setBagCount] = useState(0);
    const [openNavbar, setOpenNavbar] = useState(false);
    const [open, setOpen] = useState(0);
    const [selected, SetIsSelected] = useState("All Categories");

    const [isRegister, setIsRegister] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [anchorEl, setAnchorEl] = useState(null);
    const openProfile = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const { fetchUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        closeDrawerLogin();

        try {
            // console.log(name, email, password);
            const response = await axios.post('http://localhost:4000/api/v1/register', {
                name,
                email,
                password,
            });
            alert('Registration successful');
            // console.log(response);
            setIsRegister(false);
            navigate('/login');

        } catch (error) {
            alert(error.response.data.message);
            console.error('Registration failed:', error);
        }
    };
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        closeDrawerLogin();

        try {
            const response = await axios.post('http://localhost:4000/api/v1/login', {
                email,
                password
            },
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },

                });
            
            localStorage.setItem("role",response.data.user.role);

            // Set the refresh token in the cookie
            alert("Log In Successfull");
            const Token = response.data.token;
            Cookies.set('tokenjwt', Token);

            if (response.data.user.role === 'admin') {
                navigate('/admin');
                window.location.href = '/admin';
            } else {
                navigate('/');
            }

            setIsLoggedIn(true); // Update isLoggedIn state in the Navbar component
        } catch (error) {
            alert(error.response.data.message);
            console.error('Login failed:', error);
        }
    };

    const handleLogout = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/v1/logout', {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response && response.status === 200) {
                setIsLoggedIn(false); // Remove the logged-in state
                alert(response.data.message);
                localStorage.clear();
                navigate("/");
                Cookies.remove('tokenjwt'); // Remove the token from the cookie
            } else {
                alert("Logout failed. Please try again.");
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                alert("An error occurred. Please try again later.");
            }
            console.error(error);
        }
    };
    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    const setSelected = (value) => {
        SetIsSelected(value);
    }
    const openDrawerNavbar = () => {
        setOpenNavbar(true);
        document.body.style.overflow = "hidden";
        document.body.style.height = "100vh";

    }
    const closeDrawerNavbar = () => {
        setOpenNavbar(false);
        document.body.style.overflow = "";
        document.body.style.height = "";

    }
    const openDrawerSearch = () => {
        setOpenSearch(true);
        document.body.style.overflow = "hidden";
        document.body.style.height = "100vh";

    }
    const closeDrawerSearch = () => {
        setOpenSearch(false);
        document.body.style.overflow = "";
        document.body.style.height = "";

    }
    const openDrawerLogin = () => {
        setOpenLogin(true);
        document.body.style.overflow = "hidden";
        document.body.style.height = "100vh";
    }
    const closeDrawerLogin = () => {
        setOpenLogin(false);
        document.body.style.overflow = "";
        document.body.style.height = "";
    }
    const openDrawerBag = () => {
        setOpenBag(true);
        document.body.style.overflow = "hidden";
        document.body.style.height = "100vh";
    }
    const closeDrawerBag = () => {
        setOpenBag(false);
        document.body.style.overflow = "";
        document.body.style.height = "";
    }

    const handleRglClick = () => {
        const path = isRegister ? '/register' : '/login';
        navigate(path);
    }

    useEffect(() => {
        window.addEventListener("resize", () => window.innerWidth >= 960 && setOpenNav(false));
    }, []);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/v1/products?keyword=${searchQuery}`);
            setSearchResults(response.data.products);
        } catch (error) {
            console.error('Failed to fetch search results:', error);
        }
    };

    const navList1 = (
        <>
            <GiHamburgerMenu onClick={openDrawerNavbar} className="m-2 lg:hidden hover:cursor-pointer hover:text-pink-500 hover:scale-125 duration-100"></GiHamburgerMenu>
            <ul className="hidden mb-4 mt-2 lg:flex h-10  gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center justify-around sm:gap-8">
                <Typography as="li" variant="small" className="p-1 font-normal">
                    <Tooltip title="Share on Facebook" followCursor placement="bottom">
                        <a href="https://www.facebook.com/sharer/sharer.php?u=https://looknbookart.com" target="_blank" className="flex items-center custom-link-hover fb-icon" rel="noreferrer">
                            <FaFacebookF size={20} />
                        </a>
                    </Tooltip>
                </Typography>
                <Typography as="li" variant="small" className="p-1 font-normal">
                    <Tooltip title="Share on Pinterest" followCursor placement="bottom">
                        <a href="http://pinterest.com/pin/create/button/?url=https://looknbookart.com&media=http://cdn.shopify.com/s/files/1/0601/9514/3900/files/designer-looknbook-art-lehenga-choli-collection_260x_8bea3106-f00d-4d0a-8a46-2e23d3cb4608.png?crop=center&height=1024&v=1682939448&width=1024&description=Looknbook%20Art" target="_blank" className="flex items-center custom-link-hover pin-icon" rel="noreferrer">
                            <FaPinterestP size={20} />
                        </a>
                    </Tooltip>
                </Typography>
                <Typography as="li" variant="small" className="p-1 font-normal">
                    <Tooltip title="Share on Telegram" followCursor placement="bottom">
                        <a href="https://telegram.me/share/url?url=https://looknbookart.com"
                            target="_blank" className="flex items-center custom-link-hover tele-icon" rel="noreferrer">
                            <FaTelegram size={20} />
                        </a>
                    </Tooltip>
                </Typography>
                <Typography as="li" variant="small" className="p-1 font-normal">
                    <Tooltip title="Share on Mail" followCursor placement="bottom">
                        <a href="mailto:?subject=Looknbook%20Art&body=https://looknbookart.com" target="_blank" className="flex items-center custom-link-hover mail-icon" rel="noreferrer">
                            <MdMail size={20} />
                        </a>
                    </Tooltip>
                </Typography>
            </ul>
        </>
    );
    const navList2 = (
        <ul className="mb-4 mt-2 flex gap-1  md:gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 justify-around">
            <Typography as="li" variant="small" className="md:p-1 font-normal">
                <a href="#" className="flex items-center hover:cursor-pointer hover:text-pink-500 hover:scale-125 duration-100" onClick={openDrawerSearch}>
                    <IoIosSearch size={20} />
                </a>
            </Typography>
            {isLoggedIN ? (
                <section>
                    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                        <Tooltip title="Account settings">
                            <IconButton
                                onClick={handleClick}
                                size="small"
                                sx={{ ml: 1 }}
                                aria-controls={openProfile ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={openProfile ? 'true' : undefined}
                            >
                                <Avatar sx={{ width: 32, height: 32, bgcolor: green[500] }}
                                    variant="rounded" >
                                    U
                                </Avatar>
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={openProfile}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem onClick={() => {
                            handleClose();
                            fetchUserProfile();
                            navigate('/user');
                        }
                        }>
                            <Avatar /> Profile
                        </MenuItem>
                        <MenuItem onClick={() => {
                            handleClose();
                            navigate('/orders');
                        }
                        }>
                            <ShoppingBasket /> Orders
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={handleLogout}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </Menu>
                </section>
            )
                : (<Typography as="li" variant="small" className="md:p-1 font-normal">
                    <a href="#" className="md:flex items-center hidden hover:cursor-pointer hover:text-pink-500 hover:scale-125 duration-100" onClick={openDrawerLogin}>
                        <VscAccount size={20} />
                    </a>
                </Typography>
                )}
            <Typography as="li" variant="small" className="md:p-1  font-normal relative">
                <a href="#" className="md:flex items-center hidden hover:cursor-pointer hover:text-pink-500 hover:scale-125 duration-100">
                    <AiOutlineHeart size={20} />
                    <div className="badge absolute -top-2 -right-2">{heartCount}</div>
                </a>
            </Typography>
            <Typography as="li" variant="small" className="md:p-1 font-normal">
                <a href="#" className="flex items-center relative hover:cursor-pointer hover:text-pink-500 hover:scale-125 duration-100" onClick={openDrawerBag}>
                    <CgShoppingBag size={20} />
                    <div className="badge absolute -top-2 -right-2">{bagCount}</div>
                </a>
            </Typography>
        </ul>
    );
    const BottomNavbar = (
        <ul className="flex lg:hidden justify-around h-14 w-full  items-center fixed bottom-0 left-0 z-10 bg-white">
            <li className="flex flex-col items-center">
                <span> <ShoppingBagIcon className="h-5 w-5 cursor-pointer" /></span>Shop<span></span>
            </li>
            <li className="flex flex-col items-center">
                <span className="relative">  <AiOutlineHeart className="h-5 w-5 cursor-pointer" /> <div className="badge absolute -top-2 -right-2">{heartCount}</div></span><span>WishList</span>
            </li>
            <li className="flex flex-col items-center">
                <span className="relative"><AiOutlineShoppingCart className="cursor-pointer h-5 w-5" onClick={openDrawerBag}></AiOutlineShoppingCart> <div className="badge absolute -top-2 -right-2">{bagCount}</div></span>Cart<span></span>
            </li>
            <li className="flex flex-col items-center">
                <span> <VscAccount className="h-5 w-5 cursor-pointer" onClick={openDrawerLogin} /></span><span>Account</span>
            </li>
            <li className="flex flex-col items-center">
                <span> <IoIosSearch className="h-5 w-5 cursor-pointer" onClick={openDrawerSearch} /></span><span>Search</span>
            </li>
        </ul>
    )
    return (
        <React.Fragment>
            <Navbar className="max-w-screen-3xl py-3 lg:py-5 px-0 items-center">
                <div className="flex items-center gap-5  text-blue-gray-900 justify-around mx-5">
                    <div className="">{navList1}</div>
                    <a href="/" className="w-[12rem]">
                        <img
                            src="../images/logo.png"
                            alt="logo"
                        />
                    </a>
                    <div className="justify-end">{navList2}</div>
                </div>
                <Collapse open={openNav}>
                    <div className="container ">
                        {navList1}
                    </div>
                </Collapse>
            </Navbar>
            {BottomNavbar}
            <Drawer placement="right" open={openLogin} onClose={closeDrawerLogin}>
                <div className="mb-2 flex items-center justify-between p-4">

                    <Link to={isRegister ? '/register' : '/login'} onClick={handleRglClick}>
                        <Typography variant="h6" onClick={handleRglClick} >
                            {isRegister ? "REGISTER" : "LOGIN"}

                        </Typography>
                    </Link>
                    <IconButton variant="text" onClick={closeDrawerLogin}>
                        <XMarkIcon strokeWidth={2} className="h-5 w-5" />
                    </IconButton>
                </div>
                {!isRegister ? (
                    <form className="flex flex-col gap-6 p-4" onSubmit={handleLoginSubmit}>
                        <Input type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            size="lg" color="pink" label={
                                <>
                                    Email <span className="text-red-500">*</span>
                                </>
                            } />
                        <Input
                            size="lg"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            color="pink"
                            label={
                                <>
                                    Password <span className="text-red-500">*</span>
                                </>
                            }
                        />
                        <Link to="/recover" className=" underline font-medium transition-colors hover:text-pink-700">
                            Forgot your password?
                        </Link>
                        <Button color="pink" type="submit">Sign In</Button>
                        <a href="#" className="link" onClick={() => { setIsRegister(true) }} >New customer? Create your account</a>
                    </form>
                ) : (
                    <form className="flex flex-col gap-6 p-4" onSubmit={handleRegisterSubmit}>
                        <Input type="text" size="lg" value={name}
                            onChange={(e) => setName(e.target.value)}
                            color="pink" label="Name" />
                        <Input type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            size="lg" color="pink" label={
                                <>
                                    Email <span className="text-red-500">*</span>
                                </>
                            } />
                        <Input
                            size="lg"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            color="pink"
                            label={
                                <>
                                    Password <span className="text-red-500">*</span>
                                </>
                            }
                        />
                        <Button color="pink" type="submit" >Register</Button>
                        <a href="#" className="link" onClick={() => { setIsRegister(false) }} >Already have an account? Login here</a>
                    </form>
                )
                }
            </Drawer>
            <Drawer placement="right" open={openSearch} onClose={closeDrawerSearch}>
                <div className="mb-2 flex items-center justify-between p-4">
                    <Typography variant="h6">SEARCH OUR SITE</Typography>
                    <IconButton variant="text" onClick={closeDrawerSearch}>
                        <XMarkIcon strokeWidth={2} className="h-5 w-5" />
                    </IconButton>
                </div>
                <div className="w-61 mx-4">
                    <div className="search-container">
                        <Input
                            placeholder="Search"
                            value={searchQuery}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyPress}
                        />
                        <div className="search-icon">
                            <IoIosSearch size={20} onClick={handleSearch} />
                        </div>
                    </div>
                </div>
                <div>
                    {searchResults.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                            {searchResults.map((product) => (
                                <div key={product._id} className="bg-white p-4 shadow rounded-lg" onClick={() => { navigate("/collections/details", { state: { productId: product._id } }); closeDrawerSearch(); }}>
                                    <img src={product.images[0].url} alt={product.name} className="h-40 w-full object-cover rounded-md" />
                                    <h2 className="mt-2 text-xl font-semibold">{product.name}</h2>
                                    <p className="text-gray-500">{product.description}</p>
                                    <p className="text-gray-700">Price: {product.price} ₹</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No results found.</p>
                    )}
                </div>

            </Drawer>
            {/* openBag,closeDrawerBag */}
            <AddtoCart open={openBag} onClose={closeDrawerBag}></AddtoCart>


            <Drawer open={openNavbar} onClose={closeDrawerNavbar}>
                <div className="mb-2 flex items-center justify-between p-4">

                    <Typography variant="h6" color="blue-gray">

                        Side Menu
                    </Typography>
                    <IconButton variant="text" color="blue-gray" onClick={closeDrawerNavbar}>
                        <XMarkIcon strokeWidth={2} className="h-5 w-5" />
                    </IconButton>
                </div>
                <List>
                    <ListItem>
                    <Link to="/LehengaCholiCollections" className='menu-btn' onClick={closeDrawerNavbar}>
                        <ListItemPrefix className="flex gap-3">
                            <ShoppingBagIcon className="h-5 w-5" />
                           
                            Lehenga Choli
                      
                        </ListItemPrefix>
                        </Link>
                    </ListItem>
                    <ListItem>
                    <Link to="/SareesCollections" onClick={closeDrawerNavbar}>
                        <ListItemPrefix className="flex gap-3">
                            <ShoppingBagIcon className="h-5 w-5" />
                                Sarees
                        </ListItemPrefix>
                        </Link>
                    </ListItem>
                    <ListItem>
                    <Link to="/GownCollections" onClick={closeDrawerNavbar}>
                        <ListItemPrefix className="flex gap-3">
                            <ShoppingBagIcon className="h-5 w-5" />
                                Gown
                        </ListItemPrefix>
                        </Link>
                        
                    </ListItem>
                    <ListItem>
                    <Link to="/TopCollections" onClick={closeDrawerNavbar}>
                        <ListItemPrefix className="flex gap-3">
                            <ShoppingBagIcon className="h-5 w-5" />
                                Top
                        </ListItemPrefix>
                        </Link>
                        
                    </ListItem>
                </List>
            </Drawer>

        </React.Fragment >
    );
}