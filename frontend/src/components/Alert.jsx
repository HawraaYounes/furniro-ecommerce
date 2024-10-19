import React, { useEffect, useState } from "react";

const Alert = ({ type, message, description, duration = 5000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer); // Cleanup timer
  }, [duration]);

  if (!visible) return null;

  let bgColor, icon;

  // Assign colors and icons based on the type of message
  switch (type) {
    case "success":
      bgColor = "bg-success";
      icon = "✓";
      break;
    case "error":
      bgColor = "bg-danger";
      icon = "✖";
      break;
    case "warning":
      bgColor = "bg-accent";
      icon = "!";
      break;
    case "info":
      bgColor = "bg-gray";
      icon = "?";
      break;
    default:
      bgColor = "bg-light";
      icon = "?";
  }

  return (
    <div className={`flex items-center p-4 rounded-lg ${bgColor} text-white shadow-md`}>
      <div className="mr-4 text-2xl">{icon}</div>
      <div>
        <p className="font-bold text-lg">{message}</p>
        {description && <p className="text-sm">{description}</p>}
      </div>
    </div>
  );
};

export default Alert;
