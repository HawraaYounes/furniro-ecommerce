import React from "react";
import Nav from "../components/Nav";
import Hero from "../sections/home/Hero";
import Categories from "../sections/home/Categories";
import Products from "../sections/home/Products";

const Home = () => {
  return (
    <>
      <div className=" bg-hero-pattern bg-no-repeat bg-cover bg-center ">
        <Nav />
        <Hero />
      </div>
      <Categories />
      <Products />
    </>
  );
};

export default Home;
