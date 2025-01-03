import styles from "../../style";
import { categories } from "../../constants";

const CategoryCard = ({ img, title }) => {
  return (
    <div className="m-auto text-center flex-grow py-2">
      <img src={img} alt="category-img" className="rounded-lg" />
      <p className={`${styles.title} pt-[30px] w-full`}>{title}</p>
    </div>
  );
};

const Categories = () => {
  return (
    <section className={`${styles.paddingY} ${styles.paddingX} items-center`}>
      <h2 className={`${styles.heading}`}>Browse The Range</h2>
      <p className={`${styles.subHeading}`}>
        Discover timeless designs to transform every room in your home.
      </p>

      <ul
        className={`pt-[72px] px-[26px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 `}
      >
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
