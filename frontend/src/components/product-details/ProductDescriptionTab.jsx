import React, { useState, useRef, useEffect } from "react";
import { useLoaderData } from "react-router-dom";

const ProductDescriptionTab = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState("80px");
  const product = useLoaderData(); // Access product data
  console.log("Product",product)
  useEffect(() => {
    if (isExpanded) {
      setMaxHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setMaxHeight("82px");
    }
  }, [isExpanded]);


  return (
    <div className="sm:px-3 flex flex-col items-start">
      <div
        ref={contentRef}
        className="w-full text-base font-poppins text-gray text-left font-light whitespace-pre-wrap overflow-hidden transition-all duration-500 ease-in-out"
        style={{ maxHeight }}
      >
       { product.description || 'You’ll definitely  love this product — full details coming soon.'}
      </div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-accent font-poppins mt-2 underline cursor-pointer"
      >
        {isExpanded ? "Show Less" : "Show More"}
      </button>
    </div>
  );
};

export default ProductDescriptionTab;
