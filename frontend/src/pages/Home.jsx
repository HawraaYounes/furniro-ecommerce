import React from "react";
import Hero from "../sections/home/Hero";
import Categories from "../sections/home/Categories";
import { Link, useLoaderData } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const data = useLoaderData();
  console.log("PRODUCTS IN HOME", data.products);
  return (
    <>
      <div className=" bg-hero-pattern bg-no-repeat bg-cover bg-center ">
        <Hero />
      </div>
      <Categories />
      <ul>
        {data.products.map((product) => (
          <li key={product.id}>
            <Link to={`/shop/${product.id}`}>
              <ProductCard product={product} />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export const fetchProductsLoader = async () => {
  const response = await fetch(
    "https://dummyjson.com/products?limit=10&skip=10&select=title,price"
  );
  if (!response.ok) {
    console.log("failed");
  } else {
    return response;
  }
};
export default Home;
