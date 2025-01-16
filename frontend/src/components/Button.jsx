import React from 'react';

const Button = ({ label, variant = 'hero', ...props }) => {
  const buttonStyle =
    variant === 'hero'
      ? "font-poppins bg-[#B88E2F] text-white py-4 px-11 md:py-[25px] md:px-[72px] md:mt-10 mt-2 font-semibold"
      : variant === 'outline'
      ? "font-poppins bg-white text-black border border-black py-3 px-8 md:py-[15px] md:px-[50px] md:mt-5 mt-1 font-semibold rounded-lg"
      : "font-poppins bg-white text-[#B88E2F] border-2 border-[#B88E2F] py-3 px-8 md:py-[15px] md:px-[50px] md:mt-5 mt-1 font-semibold";

  return (
    <button className={`${buttonStyle}`} {...props}>
      {label}
    </button>
  );
};

export default Button;
