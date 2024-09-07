import styles from "../../style";
import { categories } from "../../constants";

const CategoryCard = ({ img, title }) => {
  return (
    <div>
      <img src={img} alt="category-img" className="rounded-lg"/>
      <p className={`${styles.title} pt-[30px]`}>{title}</p>
    </div>
  );
};

const Categories = () => {
  return (
    <section className={`${styles.paddingY}`}>
      <h2 className={`${styles.heading} `}>Browse The Range</h2>
      <p className={`${styles.subHeading}`}>
        Discover timeless designs to transform every room in your home.
      </p>

      <ul className={`${styles.paddingX} pt-[72px] flex flex-row justify-between`}>
        {categories.map((category) => (
          <li key={category.id}>
            <CategoryCard img={category.image} title={category.name} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Categories;
