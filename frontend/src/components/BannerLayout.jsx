import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { arrowRightIcon, banner } from "../assets";

const CommonBannerLayout = () => {
  const bannerData = useSelector((state) => state.banner);

  return (
    <>
      {bannerData.title && (
        <div
          style={{
            backgroundImage: `url(${banner})`,
          }}
          className=" w-full h-56 md:h-80 bg-cover bg-center bg-no-repeat font-poppins"
        >
          <div className="flex flex-col justify-center items-center h-full">
            <h1 className="text-5xl font-medium text-black mb-2">
              {bannerData.title}
            </h1>
            <p className="font-light">
              <span className="font-medium">
                Home{" "}
                <img
                  src={arrowRightIcon}
                  className="inline w-5 h-5 font-thin"
                />
              </span>
              {bannerData.title}
            </p>
          </div>
        </div>
      )}

      <Outlet />
    </>
  );
};

export default CommonBannerLayout;
