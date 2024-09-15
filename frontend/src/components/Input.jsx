import React from "react";

const Input = ({ label, name, placeholder, type = "text" }) => {
  return (
    <div className="flex flex-col items-start">
      <label
        htmlFor={name}
        className="block mb-[22px] font-medium font-poppins"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="bg-white border border-gray mb-3 py-[25px] px-[30px] w-full rounded-[10px] focus:outline-none"
        required
      />
    </div>
  );
};

export default Input;
