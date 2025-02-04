import StarRating from "./StarRating";

const ProductReviewsTab = () => {
  const averageRating = 4.9;
  const totalReviews = 214;
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
  return (
    <div className="flex flex-wrap sm:flex-nowrap w-full font-poppins gap-6">
      {/* Average Rating */}
      <div className="flex items-center px-4 w-1/4 justify-between relative ">
        <div className="flex gap-6 justify-center w-full border-b border-gray pb-2 absolute inset-x-0 top-0">
          <div className="">
            <p className="text-3xl font-bold">
              {averageRating.toFixed(1)}
              <span className="text-xs font-light">/ 5</span>
            </p>
          </div>
          <div className="flex flex-col">
            <StarRating averageRating={averageRating} />
            <span className="text-gray text-xs mt-1">
              Based on {totalReviews} reviews
            </span>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="w-3/4 text-left">
        {reviews.map((review, index) => (
          <div key={index} className="px-4 mb-4">
            <div className="flex items-center gap-2">
              <StarRating averageRating={review.rating} />
              <span className="font-medium">{review.name}</span>
            </div>
            <p className="mt-2 font-light">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReviewsTab;
