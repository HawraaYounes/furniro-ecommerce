import React, { useEffect, useState } from "react";
import { alertTypes } from "../constants";


const Alert = ({ type, message, description, duration = 5000 }) => {
  const [visible, setVisible] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => setVisible(false), duration);
  //   return () => clearTimeout(timer); // Cleanup timer
  // }, [duration]);

  if (!visible) return null;
  console.log(type,"///////////")
  const { bgColor, icon, bubbleImg } = alertTypes[type];
  console.log("typeee",type)
  return (
    <div
      className={`relative flex font-poppins w-1/2 rounded-[32px] ${bgColor} text-white shadow-md max-w-[400px] mx-5 justify-normal items-center py-4 pl-4`}
    >
      {/* Icon container */}
      <div className="mb-3">
        <img
          src={icon}
          alt={`${type} icon`}
          className="w-[70px] h-[70px] absolute top-[-40px]"
        />
      </div>
      {/* Bubbles image */}
      <div className="absolute bottom-0 left-0">
        <img src={bubbleImg} alt="bubbles" className="rounded-bl-[32px]" />
      </div>
      {/* Text container */}
      <div className="text-left py-4 px-6 ml-[90px]">
        {/* Adjusted margin to make space for the icon */}
        <p className="text-[24px]">{message}</p>
        {description && (
          <p className="text-[14px] font-light max-w-">{description}</p>
        )}
      </div>
    </div>
  );
};

export default Alert;