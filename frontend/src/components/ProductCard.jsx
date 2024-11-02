import { useLoaderData } from "react-router-dom";

const ProductCard = ({ product }) => {
  
  return (
    <div>
      <div
        className={`bg-[url('${product.thumbnail}')] bg-cover bg-center h-72 w-48 rounded-lg`}
      >
        <p>{product.title}</p>
      </div>
    </div>
  );
};

export default ProductCard;
