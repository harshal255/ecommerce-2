import { TfiLocationPin } from 'react-icons/tfi';
import { HiOutlineMail, HiOutlinePhone } from 'react-icons/hi';


const SITEMAP = [
    {
        id: "1",
        title: "Get in touch",
        links: [
            { text: "409 green plaza, Lift no 4 only. Near maharaja farm,Surat Gujarat", icon: TfiLocationPin },
            { text: "support@looknbookart.com", icon: HiOutlineMail, href: "mailto:?subject=Looknbook%20Art&body=https://looknbookart.com" },
            { text: "+91.96649 70700", icon: HiOutlinePhone, href: "tel:+919664970700" },
        ],
    },
    {
        id: "2",
        title: "Help",
        links: [
            { text: "My Account", href: "/account", },
            { text: "Track Order", href: "/account" },
            { text: "FAQ", href: "https://looknbookart.com/pages/faq" },
        ],
    },
    {
        id: "3",
        title: "Information",
        links: [
            { text: "Privacy Policy", href: "https://looknbookart.com/pages/faq", },
            { text: "Refund Policy", href: "https://looknbookart.com/policies/refund-policy", },
            { text: "Shipping Policy", href: "https://looknbookart.com/policies/shipping-policy", },
            { text: "Terms of Service", href: "https://looknbookart.com/policies/terms-of-service", },
        ],
    },
    {
        id: "4",
        title: "Company",
        links: [
            { text: "About Us", href: "https://looknbookart.com/pages/about-us", },
            { text: "Terms and Condition", href: "https://looknbookart.com/policies/terms-of-service", },
            { text: "Contact", href: "https://looknbookart.com/pages/contact", },
        ],
    },
];


export default SITEMAP;