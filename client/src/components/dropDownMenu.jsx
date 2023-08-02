import React from 'react';
import "../css/navbar.css";
import {
    Typography,
    ListItem,
    Menu,
    MenuHandler,
    MenuList,
} from "@material-tailwind/react";

const dropDownMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
    const [isDropdownOpen1, setIsDropdownOpen1] = React.useState(false);
    const [isDropdownOpen2, setIsDropdownOpen2] = React.useState(false);
    const [isDropdownOpen3, setIsDropdownOpen3] = React.useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 960) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleMenuToggle = () => {
        setIsMobileMenuOpen((current) => !current);
    };

    return (
        <React.Fragment>
            <div className="py-5 hidden lg:flex justify-center gap-[16px]">
                <div
                    className="menu-item-wrapper"
                    onMouseOver={() => setIsDropdownOpen(true)}
                    onMouseOut={() => setIsDropdownOpen(false)}
                >
                    <Menu
                        open={isDropdownOpen}
                        handler={setIsMenuOpen}
                        offset={{ mainAxis: 20 }}
                        placement="bottom"
                        allowHover={true}
                    >
                        <MenuHandler>
                            <Typography as="div" variant="small" className="font-normal">
                                <ListItem
                                    className="flex items-center gap-2 py-2 pr-4 menu-btn"
                                    selected={isMenuOpen || isMobileMenuOpen}
                                    onClick={handleMenuToggle}
                                >
                                    <div className='menu-btn'>
                                        Lehenga Choli
                                    </div>
                                </ListItem>
                            </Typography>
                        </MenuHandler>
                        <MenuList className="hidden lg:block menu-ex ">
                            <ul className="grid grid-cols-4 gap-6  text-center ">
                                <li className='menu-btn text-gray-600'><a href="/collections/bridal-lehenga">Bridal Lehenga</a></li>
                                <li className='menu-btn text-gray-600'><a href="/collections/bridesmaid-lehenga">Bridesmaid Lehenga</a></li>
                                <li className='menu-btn text-gray-600'><a href="/collections/jequard-lehenga-choli">Jacquard Lehenga Choli</a></li>
                                <li className='menu-btn text-gray-600'><a href="/collections/chaniya-choli">Chaniya Choli</a></li>
                                <li className='menu-btn text-gray-600'><a href="/collections/cotton-lehenga">Cotton Lehenga</a></li>
                                <li className='menu-btn text-gray-600'><a href="/collections/crop-top-lehenga-choli">Co-ords Set</a></li>
                                <li className='menu-btn text-gray-600'><a href="/collections/lucknowi-collection">Lucknowi Lehenga</a></li>
                                <li className='menu-btn text-gray-600'><a href="/collections/engagement-lehenga">Engagement Lehenga</a></li>
                                <li className='menu-btn text-gray-600'><a href="/collections/mehndi-rasam">Mehndi Rasam</a></li>
                                <li className='menu-btn text-gray-600'><a href="/collections/haldi-rasam-lehenga-choli">Haldi Rasam Lehenga Choli</a></li>
                                <li className='menu-btn text-gray-600'><a href="/collections/patola-lehenga-choli">Patola Lehenga Choli</a></li>
                                <li className='menu-btn text-gray-600'><a href="/collections/party-wear-lehenga">Party Wear Lehenga</a></li>
                                <li className='menu-btn text-gray-600'><a href="/collections/printed-lehenga-choli">Printed Lehenga Choli</a></li>
                                <li className='menu-btn text-gray-600'><a href="/collections/bandhani-print-lehenga">Bandhani Print Lehenga</a></li>
                                <li className='menu-btn text-gray-600'><a href="/collections/sequence-lehenga-choli">Sequins Lehenga Choli</a></li>
                                <li className='menu-btn text-gray-600'><a href="/collections/gaji-silk">Gaji Silk Lehenga </a></li>
                                <li className='menu-btn text-gray-600'><a href="/collections/silk-lehenga">Silk Lehenga</a></li>
                                <li className='menu-btn text-gray-600'><a href="/collections/south-indian-lehenga">South Indian Lehenga</a></li>
                                <li className='menu-btn text-gray-600'><a href="/collections/paithani-lehenga">Paithani Lehenga</a></li>
                                <li className='menu-btn text-gray-600'><a href="/collections/new-arrival">New Arrivals</a></li>
                            </ul>
                        </MenuList>
                    </Menu>
                </div>
                <div
                    className="menu-item-wrapper"
                    onMouseOver={() => setIsDropdownOpen1(true)}
                    onMouseOut={() => setIsDropdownOpen1(false)}
                >
                    <Menu
                        open={isDropdownOpen1}
                        handler={setIsMenuOpen}
                        offset={{ mainAxis: 20 }}
                        placement="bottom"
                        allowHover={true}
                    >
                        <MenuHandler>
                            <Typography as="div" variant="small" className="font-normal">
                                <ListItem
                                    className="flex items-center gap-2 py-2 pr-4 menu-btn"
                                    selected={isMenuOpen || isMobileMenuOpen}
                                    onClick={handleMenuToggle}
                                >
                                    <div className='menu-btn'>
                                        Sarees
                                    </div>
                                </ListItem>
                            </Typography>
                        </MenuHandler>
                        <MenuList className="hidden lg:block menu-ex">
                            <ul className='grid grid-cols-7 gap-4'>
                                <li className='menu-btn col-start-2 text-gray-600'><a href="/collections/anarkali-gown">Anarkali Gown</a></li>
                                <li className='menu-btn col-start-2 text-gray-600'><a href="/collections/printed-gown">Printed Gown</a></li>
                                <li className='menu-btn col-start-2 text-gray-600'><a href="/collections/jacquard-gown">Jacquard Gown</a></li>
                                <li className='menu-btn col-start-2 text-gray-600'><a href="/collections/pethani-gown">Paithani Gown</a></li>
                                <li className='menu-btn col-start-3 row-start-1 text-gray-600'><a href="/collections/plain-gown">Plain Gown</a></li>
                                <li className='menu-btn col-start-3 row-start-2 text-gray-600'><a href="/collections/georgette-gown">Georgette Gown</a></li>
                                <li className='menu-btn col-start-3 row-start-3 text-gray-600'><a href="/collections/silk-gown">Silk Gown</a></li>
                            </ul>
                        </MenuList>
                    </Menu>
                </div>
                <div
                    className="menu-item-wrapper"
                    onMouseOver={() => setIsDropdownOpen2(true)}
                    onMouseOut={() => setIsDropdownOpen2(false)}
                >
                    <Menu
                        open={isDropdownOpen2}
                        handler={setIsMenuOpen}
                        offset={{ mainAxis: 20 }}
                        placement="bottom"
                        allowHover={true}
                    >
                        <MenuHandler>
                            <Typography as="div" variant="small" className="font-normal">
                                <ListItem
                                    className="flex items-center gap-2 py-2 pr-4 menu-btn"
                                    selected={isMenuOpen || isMobileMenuOpen}
                                    onClick={handleMenuToggle}
                                >
                                    <div className='menu-btn'>
                                        Gown
                                    </div>
                                </ListItem>
                            </Typography>
                        </MenuHandler>
                        <MenuList className="hidden lg:block menu-ex">
                            <ul className='grid grid-cols-7 gap-4'>
                                <li className='menu-btn col-start-2 text-gray-600'><a href="/collections/anarkali-gown">Anarkali Gown</a></li>
                                <li className='menu-btn col-start-2 text-gray-600'><a href="/collections/printed-gown">Printed Gown</a></li>
                                <li className='menu-btn col-start-2 text-gray-600'><a href="/collections/jacquard-gown">Jacquard Gown</a></li>
                                <li className='menu-btn col-start-2 text-gray-600'><a href="/collections/pethani-gown">Paithani Gown</a></li>
                                <li className='menu-btn col-start-3 row-start-1 text-gray-600'><a href="/collections/plain-gown">Plain Gown</a></li>
                                <li className='menu-btn col-start-3 row-start-2 text-gray-600'><a href="/collections/georgette-gown">Georgette Gown</a></li>
                                <li className='menu-btn col-start-3 row-start-3 text-gray-600'><a href="/collections/silk-gown">Silk Gown</a></li>
                            </ul>
                        </MenuList>
                    </Menu>
                </div>
                <div
                    className="menu-item-wrapper"
                    onMouseOver={() => setIsDropdownOpen3(true)}
                    onMouseOut={() => setIsDropdownOpen3(false)}
                >
                    <Menu
                        open={isDropdownOpen3}
                        handler={setIsMenuOpen}
                        offset={{ mainAxis: 20 }}
                        placement="bottom"
                        allowHover={true}
                    >
                        <MenuHandler>
                            <Typography as="div" variant="small" className="font-normal">
                                <ListItem
                                    className="flex items-center gap-1 py-2 pr-4 menu-btn"
                                    selected={isMenuOpen || isMobileMenuOpen}
                                    onClick={handleMenuToggle}
                                >
                                    <div className='menu-btn'>
                                        Collections
                                    </div>
                                </ListItem>
                            </Typography>
                        </MenuHandler>
                        <MenuList className="hidden lg:block menu-ex">
                            <ul className='grid grid-cols-5 gap-4'>
                                <li className='menu-btn col-start-2 text-gray-600'><a href="/collections/kaftan">Kaftan</a></li>
                                <li className='menu-btn col-start-2 text-gray-600'><a href="/collections/dupatta">Dupattas</a></li>
                                <li className='menu-btn col-start-2 text-gray-600'><a href="/collections/dresses">Dresses</a></li>
                                <li className='menu-btn col-start-2 text-gray-600'><a href="/collections/purse">Purse</a></li>
                                <li className='menu-btn col-start-3 row-start-1 text-gray-600'><a href="/collections/blouse">Ready Made Blouse</a></li>
                                <li className='menu-btn col-start-3 row-start-2 text-gray-600'><a href="/collections/ready-to-wear">Ready To Wear</a></li>
                                <li className='menu-btn col-start-3 row-start-3 text-gray-600'><a href="/collections/plus-size-lehenga">Plus Size Lehenga</a></li>
                                <li className='menu-btn col-start-3 row-start-4 text-gray-600'><a href="/collections/tops">Tops</a></li>
                            </ul>
                        </MenuList>
                    </Menu>
                </div>
            </div>
        </React.Fragment>
    );
};

export default dropDownMenu;