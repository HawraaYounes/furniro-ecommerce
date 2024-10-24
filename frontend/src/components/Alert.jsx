import React, { useEffect, useState } from "react";
import { alertTypes } from "../constants";
import { closeIcon } from "../assets";


const Alert = ({ type, message, description, duration = 4000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer); // Cleanup timer
  }, [duration]);

  if (!visible) return null;
  const { bgColor, icon, bubbleImg } = alertTypes[type];
  const handleClose = () => {
    setVisible(false);  
  };

  return (
    <div className="fixed right-5 bottom-5 z-50 w-full max-w-[400px] "> {/* Set width and max-width */}
      <div
        className={`relative flex font-poppins w-auto rounded-[32px] ${bgColor} text-white shadow-md justify-normal items-center `}
      >
        <button 
          onClick={handleClose} 
          className="absolute top-2 right-2 text-white text-[20px] font-bold cursor-pointer py-2 px-4"
        >
         <img src={closeIcon} alt="close-icon" className="w-6 h-6 "/>
        </button>

        <div className="mb-3">
          <img
            src={icon}
            alt={`${type} icon`}
            className="w-[70px] h-[70px] absolute top-[-40px]"
          />
        </div>
        <div className="absolute bottom-0 left-0">
          <img src={bubbleImg} alt="bubbles" className="rounded-bl-[32px]" />
        </div>
        <div className="text-left py-4 px-6 ml-[90px]">
          <p className="text-[24px]">{message}</p>
          {description && (
            <p className="text-[14px] font-light">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Alert;