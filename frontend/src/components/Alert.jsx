import React, { useEffect, useState } from "react";
import styles from "../style";
import { failIcon, questionIcon, redBubbles, successIcon, warningIcon } from "../assets";

const Alert = ({ type, message, description, duration = 5000 }) => {
  const [visible, setVisible] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => setVisible(false), duration);
  //   return () => clearTimeout(timer); // Cleanup timer
  // }, [duration]);

  if (!visible) return null;

  let bgColor, icon;

  // Assign colors and icons based on the type of message
  switch (type) {
    case "success":
      bgColor = "bg-success";
      icon = successIcon; 
      break;
    case "error":
      bgColor = "bg-danger";
      icon = failIcon; 
      break;
    case "warning":
      bgColor = "bg-accent";
      icon = warningIcon; 
      break;
    case "info":
      bgColor = "bg-gray";
      icon = questionIcon; 
      break;
    default:
      bgColor = "bg-light";
      icon = questionIcon; 
  }

  return (
    <div className={`flex font-poppins w-1/2 rounded-[32px] ${bgColor} text-white shadow-md relative max-w-[500px] mx-5`}>
      <div className="absolute top-[-40px] mb-3">
        <img src={icon} alt={`${type} icon` } className="w-[78px] h-[78px]"/> 
      </div>
      <div className={`bottom-0 absolute `}>
        <img src={redBubbles} alt="bubbles" className=""/>
      </div>
      <div className="text-left py-9">
        <p className="text-[34px] ">{message}</p>
        {description && <p className="text-[14px] font-light">{description}</p>}
      </div>
    </div>
  );
};

export default Alert;
