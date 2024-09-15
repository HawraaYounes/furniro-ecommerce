import {
  userAlertIcon,
  searchIcon,
  favIcon,
  cartIcon,
  diningImg,
  livingImg,
  bedroomImg,
} from "../assets";
export const navLinks = [
  {
    id: "home",
    title: "Home",
  },
  {
    id: "shop",
    title: "Shop",
  },
  {
    id: "about",
    title: "About",
  },
  {
    id: "contact",
    title: "Contact",
  },
];
export const navIcons = [
  {
    id: "user",
    icon: userAlertIcon,
    link: "/auth",
  },
  {
    id: "search",
    icon: searchIcon,
    link: "/search",
  },
  {
    id: "fav",
    icon: favIcon,
    link: "/favorites",
  },
  {
    id: "cart",
    icon: cartIcon,
    link: "/cart",
  },
];

export const categories = [
  {
    id: "dining",
    name: "Dining",
    image: diningImg,
  },
  {
    id: "living",
    name: "Living",
    image: livingImg,
  },
  {
    id: "bedroom",
    name: "Bedroom",
    image: bedroomImg,
  },
];
