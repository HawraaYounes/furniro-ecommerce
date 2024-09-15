import React from "react";

const Input = ({ label , name, type="text"}) => {
  return (
    <div>
       <label htmlFor={name}>{label}</label>
       <input id={name} name={name} type={type} className="border-black m-1 rounded-lg" />
    </div>
  );
};

export default Input;
