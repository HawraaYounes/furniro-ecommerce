import React, { useEffect } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setBannerData, clearBannerData } from "../store/bannerSlice";
import ProductCard from "../components/ProductCard";


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
      <h1>Shop Page</h1>
      <ul>
        {data.products.map((product) => (
          <li key={product.id}>
            <Link to={`/shop/${product.id}`}><ProductCard product={product}/></Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Shop;
