import React, { useEffect, useState } from "react";
import {
  failIcon,
  grayBubbles,
  greenBubbles,
  questionIcon,
  redBubbles,
  successIcon,
  warningIcon,
  yellowBubbles,
} from "../assets";

const Alert = ({ type, message, description, duration = 5000 }) => {
  const [visible, setVisible] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => setVisible(false), duration);
  //   return () => clearTimeout(timer); // Cleanup timer
  // }, [duration]);

  if (!visible) return null;

  let bgColor, icon, bubbleImg;

  // Assign colors and icons based on the type of message
  switch (type) {
    case "success":
      bgColor = "bg-success";
      icon = successIcon;
      bubbleImg = greenBubbles;
      break;
    case "error":
      bgColor = "bg-danger";
      icon = failIcon;
      bubbleImg = redBubbles;
      break;
    case "warning":
      bgColor = "bg-accent";
      icon = warningIcon;
      bubbleImg = yellowBubbles;
      break;
    case "info":
      bgColor = "bg-gray";
      icon = questionIcon;
      bubbleImg = grayBubbles;
      break;
    default:
      bgColor = "bg-light";
      icon = questionIcon;
      bubbleImg = grayBubbles;
  }

  return (
    <div
      className={`relative flex font-poppins w-1/2 rounded-[32px] ${bgColor} text-white shadow-md max-w-[400px] mx-5 justify-between items-center py-4 pl-4`}
    >
      {/* Icon container */}
      <div className="mb-3">
        <img
          src={icon}
          alt={`${type} icon`}
          className="w-[70px] h-[70px] absolute top-[-40px] "
        />
      </div>
      {/* Bubbles image */}
      <div className="absolute bottom-0 left-0 ">
        <img src={bubbleImg} alt="bubbles" className="rounded-[32px]" />
      </div>
      {/* Text container */}
      <div className="text-left py-4 px-6 ml-[90px]">
        {" "}
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
