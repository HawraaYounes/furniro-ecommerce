/* eslint-disable react/prop-types */
import { starFilledIcon } from "../../assets";

const RatingProgressBar = ({ count, percentage, star }) => {
  return (
    <div className="items-center flex justify-evenly w-full font-poppins text-gray-600 font-light text-gray gap-3 text-sm">
      <div className="flex gap-1 text-center">
        <span>{star}</span>
        <span className="self-center h-full ">
          <img src={starFilledIcon} alt="Star Icon" className="h-full w-full" />
        </span>
      </div>
      {/* Custom Progress Bar */}
      <div className="w-full h-[6px] bg-graylight rounded-full overflow-hidden">
        <div
          className="h-full bg-graydarkest rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span>{count}</span>
    </div>
  );
};

export default RatingProgressBar;
