import React from "react";
import Nav from "../components/Nav";
import Hero from "../sections/home/Hero";
import Categories from "../sections/home/Categories";

const Home = () => {
  return (
    <>
      <div className=" bg-hero-pattern bg-no-repeat bg-cover bg-center ">
        <Nav />
        <Hero />
      </div>
      <Categories />
    </>
  );
};

export default Home;
