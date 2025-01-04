import React from "react";
import Hero from "../sections/home/Hero";
import Categories from "../sections/home/Categories";
import { json, useLoaderData } from "react-router-dom";
import ProductList from "../components/ProductsList";
import styles from "../style";
import Button from "../components/Button";

const Home = () => {
  const data = useLoaderData();
  return (
    <>
      <div className=" bg-hero-pattern bg-no-repeat bg-cover bg-center ">
        <Hero />
      </div>
      <Categories />
      <div>
        <p className={`${styles.heading} mb-8`}>Our Products</p>
        <ProductList products={data.data} />
        <Button label="Show More" variant="secondary"/>
      </div>
    </>
  );
};

export const fetchProductsLoader = async () => {
  const response = await fetch(
    "http://localhost:3000/products"
  );
  if (!response.ok) {
    throw json({ message: "Could not fetch products" }, { status: 500 });
  } else {
    return response;
  }
};
export default Home;
