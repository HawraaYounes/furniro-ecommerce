import { useState } from "react";

const IncrementDecrementButton = ({ maxValue = 100 }) => {
  const [count, setCount] = useState(1);

  const buttonStyle =
    "font-poppins text-black py-3 px-8 md:py-[15px] md:px-[50px] rounded-none flex items-center justify-center font-normal";

  return (
    <div className="flex border border-black rounded-lg items-center overflow-hidden">
      <button
        className={`${buttonStyle} bg-white`}
        onClick={() => setCount((prev) => Math.max(prev - 1, 1))}
      >
        -
      </button>
      <p className="font-poppins px-4">{count}</p>
      <button
        className={`${buttonStyle} bg-white`}
        onClick={() => setCount((prev) => Math.min(prev + 1, maxValue))}
      >
        +
      </button>
    </div>
  );
};

export default IncrementDecrementButton;
