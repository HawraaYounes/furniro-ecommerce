import React, { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setBannerData, clearBannerData } from "../store/bannerSlice";
import { API_BASE_URL } from "../constants/config";
import axios from "axios";
import styles from "../style";
import StarRating from "../components/StarRating";

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
    <div className={`px-14 sm:px-16 flex flex-col sm:flex-row w-full`}>
      <div className="sm:w-1/6 flex sm:flex-col items-center order-2 sm:order-1 overflow-x-scroll no-scrollbar">
        {product.images.map((image) => (
          <img
            key={image.id}
            src={image.url}
            alt={product.name}
            className={`sm:w-[76px] sm:h-20 m-3  sm:mb-3 w-32 h-32 object-cover cursor-pointer ${
              currentImage === image.url ? "border-2 border-black p-[2px]" : ""
            }`}
            onClick={() => setCurrentImage(image.url)}
          />
        ))}
      </div>
      <div className="sm:w-5/12 order-1 sm:order-2 sm:mr-6 mb-4 w-full h-auto ">
        <img
          src={currentImage}
          alt="Selected product"
          className="w-full h-auto object-cover sm:mr-5 min-sm:h-[380px] aspect-square "
        />
      </div>
      <div className="sm:w-5/12 order-3 flex flex-col font-semibold text-left">
        <p className={`font-poppins text-4xl text-wrap mb-2`}>{product.name}</p>
        <p className="text-gray font-medium text-[24px] mb-2">
          $ {product.price}
        </p>
        <p className="font-normal text-sm font-poppins sm:w-3/4 sm:text-wrap">
          {product.description}
        </p>
        <div className="colors-div mt-6">
          <p className="text-sm font-normal text-gray mb-2 font-poppins">Color</p>
          <div className="flex gap-2 mb-3">
            {/* Static colors for design */}
            {["#d4bf96", "#15667B", "#000000"].map((color, index) => (
              <div
                key={index}
                className="w-7 h-7 rounded-full cursor-pointer"
                style={{ backgroundColor: color }}
              ></div>
            ))}
          </div>
          <StarRating averageRating={4}/>
        </div>
      </div>
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
