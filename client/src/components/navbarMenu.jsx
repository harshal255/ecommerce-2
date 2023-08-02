import "../css/navbar.css";
import {
    Typography,
    ListItem,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import "../css/navbar.css";


const NavbarMenu = () => {
    return (
        <div className="py-5 hidden lg:flex justify-center gap-[16px]">
            <div className="menu-item-wrapper">
                <Typography as="div" variant="small" className="font-normal">
                    <ListItem className="flex items-center gap-2 py-2 pr-4 menu-btn">
                        <Link to="/LehengaCholiCollections" className='menu-btn'>
                            Lehenga Choli
                        </Link>
                    </ListItem>
                </Typography>
            </div>
            <div className="menu-item-wrapper">
                <Typography as="div" variant="small" className="font-normal">
                    <ListItem className="flex items-center gap-2 py-2 pr-4 menu-btn">
                        <Link to="/SareesCollections">
                            <div className='menu-btn'>
                                Sarees
                            </div>
                        </Link>
                    </ListItem>
                </Typography>
            </div>
            <div className="menu-item-wrapper">
                <Typography as="div" variant="small" className="font-normal">
                    <ListItem className="flex items-center gap-2 py-2 pr-4 menu-btn">
                        <Link to="/GownCollections">
                            <div className='menu-btn'>
                                Gown
                            </div>
                        </Link>
                    </ListItem>
                </Typography>
            </div>
            <div className="menu-item-wrapper">
                <Typography as="div" variant="small" className="font-normal">
                    <ListItem className="flex items-center gap-1 py-2 pr-4 menu-btn">
                        <Link to="/TopCollections">
                            <div className='menu-btn'>
                                Top
                            </div>
                        </Link>
                    </ListItem>
                </Typography>
            </div>
        </div>
    );
};

export default NavbarMenu;
