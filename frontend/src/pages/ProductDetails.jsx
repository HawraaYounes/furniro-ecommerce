import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { setBannerData, clearBannerData } from "../store/bannerSlice";

const ProductDetails = () => {
    const params = useParams();
    const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setBannerData({
        title: "Product",
      })
    );
    return () => {
      dispatch(clearBannerData());
    };
  }, [dispatch,params.productId]);

  return (
    <div>
      <h1>Product id: {params.productId}</h1>
    </div>
  )
}

export default ProductDetails
