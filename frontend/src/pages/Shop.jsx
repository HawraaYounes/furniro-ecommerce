import React, { useEffect } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setBannerData, clearBannerData } from "../store/bannerSlice";
import ProductCard from "../components/ProductCard";
import ProductList from "../components/ProductsList";


const Shop = () => {
  const dispatch = useDispatch();
  const data=useLoaderData();
 
  useEffect(() => {
    dispatch(
      setBannerData({
        title: "Shop",
      })
    );
    return () => {
      dispatch(clearBannerData());
    };
  }, [dispatch]);

  return (
    <div>
      <ProductList products={data.products}/>
    </div>
  );
};

export default Shop;
