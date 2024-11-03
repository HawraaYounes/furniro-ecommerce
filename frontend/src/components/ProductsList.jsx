// src/components/ProductList.js
import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

const ProductList = ({ products }) => {
  return (
    <div className="p-4">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <li key={product.id} className="overflow-hidden bg-white">
            <Link to={`/shop/${product.id}`}>
              <ProductCard product={product} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
