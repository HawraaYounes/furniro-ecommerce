import React from 'react'
import { useParams } from 'react-router-dom'

const ProductDetails = () => {
    const params = useParams();
  return (
    <div>
      <h1>Product id: {params.productId}</h1>
    </div>
  )
}

export default ProductDetails
