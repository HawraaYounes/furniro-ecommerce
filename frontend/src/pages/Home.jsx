import React from "react";
import Hero from "../sections/home/Hero";
import Categories from "../sections/home/Categories";
import { json, Link, useLoaderData } from "react-router-dom";
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
        <Link to={`/shop`}>
          <Button label="Show More" variant="secondary" />
        </Link>
      </div>
    </>
  );
};

export const fetchProductsLoader = async ({ request, limit }) => {
  const page = new URL(request.url).searchParams.get("page") || 1;
  const response = await fetch(`http://localhost:3000/products?page=${page}&limit=${limit}`);
  if (!response.ok) {
    throw json({ message: "Could not fetch products" }, { status: 500 });
  }
  console.log(response)
  return response.json();
};

export default Home;
