import {
  userAlertIcon,
  searchIcon,
  favIcon,
  cartIcon,
  successIcon,
  failIcon,
  warningIcon,
  questionIcon,
  redBubbles,
  greenBubbles,
  yellowBubbles,
  grayBubbles,
  diningImg,
  livingImg,
  bedroomImg,
} from "../assets";
export const navLinks = [
  {
    id: "home",
    title: "Home",
    to: "/",
  },
  {
    id: "shop",
    title: "Shop",
    to: "/shop",
  },
  {
    id: "about",
    title: "About",
    to: "/about",
  },
  {
    id: "contact",
    title: "Contact",
    to: "/contact",
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


export const ALERT_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info"
};

export const alertTypes = {
  [ALERT_TYPES.SUCCESS]: {
    bgColor: "bg-success",
    icon: successIcon,
    bubbleImg: greenBubbles,
  },
  [ALERT_TYPES.ERROR]: {
    bgColor: "bg-danger",
    icon: failIcon,
    bubbleImg: redBubbles,
  },
  [ALERT_TYPES.WARNING]: {
    bgColor: "bg-accent",
    icon: warningIcon,
    bubbleImg: yellowBubbles,
  },
  [ALERT_TYPES.INFO]: {
    bgColor: "bg-gray",
    icon: questionIcon,
    bubbleImg: grayBubbles,
  },
};
