import React, { useEffect, useState } from "react";
import {
  failIcon,
  questionIcon,
  redBubbles,
  successIcon,
  warningIcon,
} from "../assets";

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
    <div
      className={`relative flex font-poppins w-1/2 rounded-[32px] ${bgColor} text-white shadow-md max-w-[600px] mx-5 justify-between items-center`}
    >
      {/* Icon container */}
      <div className="mb-3">
        <img
          src={icon}
          alt={`${type} icon`}
          className="w-[78px] h-[78px] absolute top-[-40px]"
        />
      </div>
      {/* Bubbles image */}
      <div className="absolute bottom-0 left-0">
        <img
          src={redBubbles}
          alt="bubbles"
          className="rounded-[32px]"
        />
      </div>
      {/* Text container */}
      <div className="text-left py-4 px-6 ml-[90px]"> {/* Adjusted margin to make space for the icon */}
        <p className="text-[24px]">{message}</p>
        {description && <p className="text-[14px] font-light max-w-">{description}</p>}
      </div>
    </div>
  );
};

export default Alert;
