import React from "react";
import Hero from "../sections/home/Hero";
import Categories from "../sections/home/Categories";
import { json, Link, useLoaderData } from "react-router-dom";
import ProductList from "../components/ProductsList";
import styles from "../style";
import Button from "../components/Button";
import axios from "axios";
import { API_BASE_URL } from "../constants/config";

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
  try {
    const response = await axios.get(`${API_BASE_URL}/products`, {
      params: { page, limit }, // Axios automatically serializes query parameters
    });
    return response.data; // Axios parses JSON for you
  } catch (error) {
    throw json(
      { message: "Could not fetch products", error: error.response?.data },
      { status: error.response?.status || 500 }
    );
  }
};
export default Home;
