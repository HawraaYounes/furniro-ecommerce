import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

const ProductList = ({ products }) => {
  return (
    <div>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
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
