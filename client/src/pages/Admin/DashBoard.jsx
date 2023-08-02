import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { green } from '@mui/material/colors';
import Logout from '@mui/icons-material/Logout';
import ListItemIcon from '@mui/material/ListItemIcon';
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
} from "@material-tailwind/react";
import { MdOutlineSell, MdReviews } from 'react-icons/md';
import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
} from "@heroicons/react/24/solid";

export default function Dashboard() {
    return (
        <>
            <div className="w-2/3 border items-centerflex">
                <Card className="fixed top-4 left-4 h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
                    <div className="mb-2 p-4">
                        <Typography variant="h5" color="blue-gray">
                            ECOMMERCE
                        </Typography>
                    </div>
                    <List>
                        <ListItem>
                            <ListItemPrefix>
                                <PresentationChartBarIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Dashboard
                        </ListItem>
                        <ListItem>
                            <ListItemPrefix>
                                <ShoppingBagIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Products
                        </ListItem>
                        <ListItem>
                            <ListItemPrefix>
                                <MdOutlineSell className="h-5 w-5" />
                            </ListItemPrefix>
                            Orders
                        </ListItem>
                        <ListItem>
                            <ListItemPrefix>
                                <UserCircleIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Users
                        </ListItem>
                        <ListItem>
                            <ListItemPrefix>
                                <MdReviews className="h-5 w-5" />
                            </ListItemPrefix>
                            Review
                        </ListItem>
                    </List>
                </Card>
            </div>
            <div className="border h-[100vh] flex flex-col ">
                <h1 className="pt-5 text-center">Dashboard</h1>
                <h1 className="pt-5 h-16 bg-blue-500 text-center">Total Amount</h1>
            </div>
        </>
    );
}