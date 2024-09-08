const ProductCard = ({ image }) => {
  return (
    <div>
      <div
        className={`bg-[url('${image}')] bg-cover bg-center h-72 w-48 rounded-lg`}
      ></div>
    </div>
  );
};

export default ProductCard;
