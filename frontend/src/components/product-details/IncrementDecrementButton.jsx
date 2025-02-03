import { useState } from "react";

const IncrementDecrementButton = ({ maxValue = 100 }) => {
  const [count, setCount] = useState(1);

  // Outer container style matches the Button component's padding
  const containerStyle =
    "font-poppins bg-white text-black border border-black p-3 md:py-[15px] rounded-lg flex justify-between items-center font-normal";

  // Inner button styles
  const buttonStyle =
    "text-black bg-white flex items-center justify-center font-normal ";

  return (
    <div className={`${containerStyle}`}>
      <button
        className={`${buttonStyle}`}
        onClick={() => setCount((prev) => Math.max(prev - 1, 1))}
      >
        -
      </button>
      <p className="font-poppins px-8">{count}</p>
      <button
        className={`${buttonStyle}`}
        onClick={() => setCount((prev) => Math.min(prev + 1, maxValue))}
      >
        +
      </button>
    </div>
  );
};

export default IncrementDecrementButton;
