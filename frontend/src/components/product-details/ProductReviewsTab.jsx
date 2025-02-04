import StarRating from "./StarRating";

const ProductReviewsTab = () => {
  const averageRating = 4.4;
  const totalReviews = 26;
  const reviews = [
    {
      name: "Isabella P.",
      rating: 5,
      comment:
        "Absolutely love this sunscreen! It feels lightweight, blends seamlessly into my skin without any white cast, and leaves a soft, dewy finish. Plus, knowing it’s reef-safe and packed with nourishing ingredients makes it a must-have in my daily routine. Highly recommend!",
    },
    {
      name: "Liam S.",
      rating: 3.5,
      comment:
        "I’ve been searching for the perfect moisturizer, and I finally found it! This product is so hydrating, absorbs quickly, and doesn’t leave a greasy residue. The natural ingredients make my skin feel revitalized and refreshed. It’s definitely a new staple in my skincare regimen.",
    },
    {
      name: "Olivia M.",
      rating: 1,
      comment: "Bad product! Dont Buy it!",
    },
  ];
  const ratingCounts = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((review) => Math.round(review.rating) === rating).length,
    percentage:
      (reviews.filter((review) => Math.round(review.rating) === rating).length /
        totalReviews) *
      100,
  }));
  
  return (
    <div className="flex flex-col sm:flex-row w-full font-poppins gap-6">
      {/* Average Rating */}
      <div className="flex items-center px-4 sm:w-1/4 w-full justify-between  relative">
        <div className="flex flex-col justify-start sm:flex-row sm:gap-6 sm:justify-center w-full border-b border-gray pb-2 sm:content-center sm:absolute sm:inset-x-0 sm:top-0">
          <div className="">
            <p className="text-5xl font-semibold text-left">
              <span className="px-1">{averageRating.toFixed(1)}</span>
              <span className="text-sm font-light">/ 5</span>
            </p>
          </div>
          <div className="flex flex-col justify-center text-left">
            <StarRating averageRating={averageRating} />
            <span className="text-gray text-xs mt-1">
              Based on {totalReviews} reviews
            </span>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="sm:w-3/4 w-full text-left">
        {reviews.map((review, index) => (
          <div key={index} className="px-4 mb-4">
            <div className="flex items-center gap-2">
              <StarRating averageRating={review.rating} />
              <span className="font-medium">{review.name}</span>
            </div>
            <p className="mt-2 font-light text-gray">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReviewsTab;
