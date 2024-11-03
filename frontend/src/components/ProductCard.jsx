import React from "react";
import { chair } from "../assets"; // Assuming chair is a placeholder image

const ProductCard = ({ product }) => {
  return (
    <div className="overflow-hidden shadow-md hover:shadow-lg">
      <div
        className="img-div h-64 w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${chair})` }} // Set the background image here
      />
      <div className="p-4">
        <h3 className="font-medium text-lg text-gray-800">{product.title}</h3>
        <p className="text-gray-700 font-semibold mt-2">
          Rp {product.price.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
