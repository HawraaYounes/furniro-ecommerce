import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import styles from "../style";

const ProductList = ({ products }) => {
  return (
    <div className={`${styles.paddingX} px-14`}>
      <ul className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <li key={product.id} className="overflow-hidden">
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
