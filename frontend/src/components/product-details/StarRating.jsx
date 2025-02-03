import { starEmptyIcon, starFilledIcon } from "../../assets";

const StarRating = ({ averageRating }) => {
  const rating = Math.min(Math.max(averageRating, 0), 5);

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => {
        const percentage = 
          rating > index
            ? rating > index + 1
              ? 100
              : (rating - index) * 100
            : 0; // Determine the percentage to fill the star

        return (
          <div
            key={index}
            className="relative w-5 h-5 flex-shrink-0"
            style={{
              backgroundImage: `url(${starEmptyIcon})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              position: "relative",
            }}
          >
            <div
              className="absolute top-0 left-0 h-full"
              style={{
                width: `${percentage}%`,
                backgroundImage: `url(${starFilledIcon})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default StarRating;
