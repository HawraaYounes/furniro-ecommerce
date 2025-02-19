/* eslint-disable react/prop-types */
import { starFilledIcon } from "../../assets";

const RatingProgressBar = ({ count, percentage }) => {
  return (
    <div className="items-center flex justify-evenly w-full font-poppins text-gray font-light">
            <span>
              <img src={starFilledIcon}  />
            </span>
            <progress value={percentage} />
            <span>{count}</span>
          </div>
  );
};

export default RatingProgressBar;