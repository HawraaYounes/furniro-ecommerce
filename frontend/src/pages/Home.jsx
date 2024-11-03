import React from "react";
import Hero from "../sections/home/Hero";
import Categories from "../sections/home/Categories";
import { json, Link, useLoaderData } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import ProductList from "../components/ProductsList";

const Home = () => {
  const data = useLoaderData();
  return (
    <>
      <div className=" bg-hero-pattern bg-no-repeat bg-cover bg-center ">
        <Hero />
      </div>
      <Categories />
      <ProductList products={data.products}/>
    </>
  );
};

export const fetchProductsLoader = async () => {
  const response = await fetch(
    "https://dummyjson.com/products?limit=10&skip=10&select=title,price"
  );
  if (!response.ok) {
    throw json({ message: "Could not fetch products" }, { status: 500 });
  } else {
    return response;
  }
};
export default Home;
