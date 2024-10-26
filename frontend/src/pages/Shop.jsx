import React from "react";
import { Link } from "react-router-dom";
const products = [
  {
    id: 1,
    title: "Modern Sofa",
  },
  {
    id: 2,
    title: "Wooden Dining Table",
  },
  {
    id: 3,
    title: "King Size Bed",
  },
];

const Shop = () => {
  return (
    <div>
      <h1>Shop Page</h1>
      <ul>
        {products.map((product) => (
          <li>
            <Link to={`/shop/${product.id}`}>{product.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Shop;
