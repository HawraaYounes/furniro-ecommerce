import React, { useEffect } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setBannerData, clearBannerData } from "../store/bannerSlice";
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
    <div className="mt-10">
      <ProductList products={data.data}/>
    </div>
  );
};

export default Shop;
