import React, { useEffect, useState } from "react";
import styles from "../style";
import { failIcon, questionIcon, successIcon, warningIcon } from "../assets";

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
      icon = successIcon; // Correct assignment without curly braces
      break;
    case "error":
      bgColor = "bg-danger";
      icon = failIcon; // Correct assignment
      break;
    case "warning":
      bgColor = "bg-accent";
      icon = warningIcon; // Correct assignment
      break;
    case "info":
      bgColor = "bg-gray";
      icon = questionIcon; // Correct assignment
      break;
    default:
      bgColor = "bg-light";
      icon = questionIcon; // Correct assignment for default
  }

  return (
    <div className={`flex font-poppins w-1/2 py-7 rounded-[32px] ${bgColor} text-white shadow-md`}>
      <div className="mr-4 text-2xl">
        <img src={icon} alt={`${type} icon` } className="w-[78px] h-[78px]"/> {/* Use img tag to render icons */}
      </div>
      <div className="text-left">
        <p className="text-[34px]">{message}</p>
        {description && <p className="text-[14px]">{description}</p>}
      </div>
    </div>
  );
};

export default Alert;
