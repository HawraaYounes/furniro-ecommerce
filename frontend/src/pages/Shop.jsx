import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setBannerData, clearBannerData } from "../store/bannerSlice";
import { banner } from "../assets";

const products = [
  { id: 1, title: "Modern Sofa" },
  { id: 2, title: "Wooden Dining Table" },
  { id: 3, title: "King Size Bed" },
];

const Shop = () => {
  const dispatch = useDispatch();

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
        {products.map((product) => (
          <li key={product.id}>
            <Link to={`/shop/${product.id}`}>{product.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Shop;
