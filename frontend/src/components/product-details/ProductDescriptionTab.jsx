import React, { useState, useRef, useEffect } from "react";

const ProductDescriptionTab = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState("80px");

  useEffect(() => {
    if (isExpanded) {
      setMaxHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setMaxHeight("82px");
    }
  }, [isExpanded]);

  const text = `About This Product Transform your bedroom with the sleek and stunning Bed Set, crafted from high-quality engineered wood. This platform bed effortlessly combines modern style with practicality, offering a sophisticated solution for both form and function in your sleep space. The contemporary headboard adds an elegant touch, while the extra-wide bed sides enhance both style and functionality with a versatile silhouette that complements various decoration styles. This bed set eliminates the need for a box spring, thanks to its innovative central support system, ensuring stability for a comfortable sleep without the bulk. Assembly is easy with just a screwdriver, and the set is conveniently delivered to your door. In summary, this bed is a high-end, modern solution featuring premium construction, versatile design, and easy assembly, perfect for transforming your bedroom into a stylish oasis. 

  Features:
  - Modern style: Upgrade your bedroom with a sleek Platform Bed featuring a headboard for contemporary elegance.
  - Quality craftsmanship: Crafted from high-quality engineered wood in an oak finish, with natural grain variation for a welcoming touch.
  - Stylish and functional: Extra-wide bedsides serve as modern surfaces for books or devices, and the versatile rectangular design complements various decor styles.
  - No box spring needed: Compatible with your mattress (sold separately) and equipped with reliable center supports, eliminating the need for a box spring.`;

  return (
    <div className="sm:px-3 flex flex-col items-start">
      <div
        ref={contentRef}
        className="w-full text-base font-poppins text-gray text-left font-light whitespace-pre-wrap overflow-hidden transition-all duration-500 ease-in-out"
        style={{ maxHeight }}
      >
        {text}
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
