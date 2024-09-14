import React from "react";

const Input = ({ label }) => {
  return (
    <div>
      <label>{label}</label>
      <input type="text" className="border border-black m-1"/>
    </div>
  );
};

export default Input;
