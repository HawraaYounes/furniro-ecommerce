import React, { useState } from 'react'
import Button from '../../components/Button'
import ProductDetailsTable from '../../components/product-details/ProductDetailsTable'
import IncrementDecrementButton from '../../components/product-details/IncrementDecrementButton'
import StarRating from '../../components/product-details/StarRating'

const ProductInfo = ({product}) => {
      const [currentImage, setCurrentImage] = useState(product.images[0].url); // Set first image as default
      const [selectedSize, setSelectedSize] = useState(null); // State to track selected size
      const [selectedColor, setSelectedColor] = useState(null); // State to track selected color
    
      // Placeholder size options
      const sizeOptions = [
        "One Size",
        "One Seat + Couch",
        "2 Seats + Couch",
        "Custom Size",
      ];
  return (
    <div className={`pb-9 flex flex-col sm:flex-row w-full`}>
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
      <p className={`font-poppins text-4xl text-wrap `}>{product.name}</p>
      <p className="text-gray font-medium text-[24px] mb-4">
        $ {product.price}
      </p>
      {/* star rating div */}
      <div className="mb-5">
        <StarRating averageRating={3.4} />
      </div>
      {/* summary div */}
      <div>
        <p className="font-normal text-sm font-poppins sm:w-5/6 sm:text-wrap">
          {product.summary}
        </p>
      </div>
      {/* sizes div */}
      <div className="sizes-div mt-5">
        <p className="text-sm font-normal text-gray mb-2 font-poppins">
          Size
        </p>
        <div className="flex flex-wrap gap-2">
          {sizeOptions.map((size, index) => (
            <button
              key={index}
              onClick={() => setSelectedSize(size)}
              className={`px-4 py-2 rounded-lg border text-sm font-medium transition ${
                selectedSize === size
                  ? "bg-accent text-primary border-accent"
                  : "bg-light text-black border-light"
              } hover:bg-accent hover:text-primary`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* colors div */}
      <div className="colors-div my-6">
        <p className="text-sm font-normal text-gray mb-2 font-poppins">
          Color
        </p>
        <div className="flex gap-2 mb-3">
          {/* Static colors for design */}
          {product.colors.map((color, index) => (
            <div
              key={index}
              className={`w-7 h-7 rounded-full cursor-pointer ${
                selectedColor === color.name
                  ? "border border-blue-300 shadow-sm shadow-blue-300" // Apply this class for the selected color
                  : "border border-[#D9D9D9]"
              }`}
              style={{ backgroundColor: color.hexCode }}
              onClick={() => setSelectedColor(color.name)}
            ></div>
          ))}
          <p className="ml-3 font-poppins text-gray font-light">{selectedColor}</p>
        </div>
      </div>

      {/* actions div */}
      <div className="flex flex-wrap gap-2 sm:gap-1 justify-between sm:justify-start md:flex-nowrap w-full">
        <IncrementDecrementButton />
        <Button label="Add To Cart" variant="outline" />
        <Button label="Compare" variant="outline" />
      </div>

      {/* details div */}
      <div className="border-t-1 border-[#D9D9D9] mt-10 font-poppins text-gray font-light text-base">
        <ProductDetailsTable product={product} />
      </div>
    </div>
  </div>
  )
}

export default ProductInfo
