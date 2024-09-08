import ProductCard from "../../components/ProductCard";
import styles from "../../style";

const Products = () => {
  return (
    <section className={`${styles.paddingX}`}>
      <h2 className={`${styles.heading}`}>Our Products</h2>
      <div className="">
        <ProductCard image=""/>
      </div>
    </section>
  );
};

export default Products;
