import React, { useEffect } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setBannerData, clearBannerData } from "../store/bannerSlice";
import { API_BASE_URL } from "../constants/config";
import axios from "axios";
import styles from "../style";

const ProductDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const product = useLoaderData(); // Access product data
  useEffect(() => {
    dispatch(
      setBannerData({
        title: "Product",
      })
    );
    return () => {
      dispatch(clearBannerData());
    };
  }, [dispatch, params.productId]);

  return (
    <div className={`px-24 flex flex-col lg:flex-row w-full  `}>
        <div className="lg:w-1/6 flex flex-col items-center">
        {product.images.map((image) => (
            <img
              key={image.id}
              src={image.url}
              alt={product.name}
              className="w-[76px] m-7 h-20 object-cover "
            />
          ))}
        </div>
        <div className="bg-zinc-800 lg:w-1/3">helo</div>
      <div className="bg-red-300 lg:w-1/2">hello</div>
    </div>
  );
};

export const fetchProductDetailsLoader = async ({ params }) => {
  const { productId } = params;

  try {
    const response = await axios.get(`${API_BASE_URL}/products/${productId}`); // Adjust API URL if
    if (response.data.success) {
      return response.data.data; // Return the product data (from the "data" field)
    } else {
    }
  } catch (error) {
    throw new Response(
      error.response?.data?.message || "Failed to fetch product details",
      {
        status: error.response?.status || 500,
      }
    );
  }
};

export default ProductDetails;
