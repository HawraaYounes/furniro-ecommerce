import React from "react";
import { chair } from "../assets"; 
import styles from "../style";

const ProductCard = ({ product }) => {
 console.log("PRODUCT", product);
  return (
    <div className="overflow-hidden shadow-md hover:shadow-lg bg-[#F4F5F7] text-left h-[450px]">
      <div
        className="img-div h-2/3 w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${product.images[0]})` }} 
      />
      <img src={product.images[0]}/>
      <div className="pt-4 pl-4 pb-7">
        <h3 className="font-semibold font-poppins text-lg text-gray-800">
          {product.name }  
        </h3>
        <p className={`${styles.paragraph}`}>{product.title}</p>
        <p className="text-gray-700 font-semibold mt-2">
          Rp {product.price.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
