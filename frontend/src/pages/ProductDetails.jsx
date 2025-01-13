import React, { useEffect, useState } from "react";
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
  const [currentImage, setCurrentImage] = useState(product.images[0].url); // Set first image as default

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
    <div className={`px-20 flex flex-col lg:flex-row w-full  `}>
      <div className="lg:w-1/6 flex lg:flex-col items-center order-2 lg:order-1">
        {product.images.map((image) => (
          <img
            key={image.id}
            src={image.url}
            alt={product.name}
            className={`lg:w-[76px] lg:m-4 lg:h-20 m-2 w-28 h-28 object-cover cursor-pointer ${
              currentImage === image.url ? "border-2 border-black p-[2px]" : ""
            }`}
            onClick={() => setCurrentImage(image.url)} 
          />
        ))}
      </div>
      <div className="lg:w-1/2 order-1 lg:order-2 mr-6 h-[320px] ">
        <img
          src={currentImage}
          alt="Selected product"
          className="w-full h-full object-cover mr-2"
        />
      </div>
      <div className="bg-red-300 lg:w-1/2 order-3">hello</div>
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
