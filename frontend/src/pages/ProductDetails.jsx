import React, { useEffect } from 'react'
import { useLoaderData, useParams } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { setBannerData, clearBannerData } from "../store/bannerSlice";
import { API_BASE_URL } from '../constants/config';
import axios from 'axios';

const ProductDetails = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const product = useLoaderData(); // Access product data
    console.log("PRODUCT DATA",product);
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
    <div className="p-4">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="text-gray-600">{product.description}</p>
      <p className="text-lg font-semibold">Price: ${product.price}</p>

      {/* Display product images */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Images:</h2>
        <div className="flex space-x-4">
          {product.images.map((image) => (
            <img
              key={image.id}
              src={image.url}
              alt={product.name}
              className="w-48 h-48 object-cover"
            />
          ))}
        </div>
      </div>

      {/* Display product category */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Category:</h2>
        <p>{product.category.name}</p>
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
    throw new Response(error.response?.data?.message || "Failed to fetch product details", {
      status: error.response?.status || 500,
    });
  }
};

export default ProductDetails;
