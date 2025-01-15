import { starEmptyIcon, starFilledIcon } from "../assets";

const StarRating = ({ averageRating }) => {
    // Ensure the rating is between 0 and 5
    const rating = Math.min(Math.max(averageRating, 0), 5);
  
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => {
          const isFullStar = index < Math.floor(rating);
          const isHalfStar = index < rating && index >= Math.floor(rating);
  
          return (
            <div key={index}>
              {isFullStar ? (
                <img src={starFilledIcon} alt="Filled Star" />
              ) : isHalfStar ? (
                <img src={starFilledIcon} alt="Half Star" style={{ clipPath: "inset(0 50% 0 0)" }} />
              ) : (
                <img src={starEmptyIcon} alt="Empty Star" />
              )}
            </div>
          );
        })}
      </div>
    );
  };
  
  export default StarRating;
  