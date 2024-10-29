import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { arrowRightIcon } from "../assets";

const CommonBannerLayout = () => {
  const bannerData = useSelector((state) => state.banner);

  return (
    <>
      {bannerData.title && (
        <div
          className="relative w-full h-56 bg-cover bg-center font-poppins"
          style={{
            backgroundImage: `url(${bannerData.backgroundImage})`,
          }}
        >
          <div
            className="absolute bg-cover bg-center"
            style={{ backgroundImage: `url(${bannerData.backgroundImage})` }}
          ></div>
          <div className="flex flex-col justify-center items-center h-full">
            <h1 className="text-5xl font-medium text-black mb-2">
              {bannerData.title}
            </h1>
            <p className="">
              <span className="font-bold">
                Home <img src={arrowRightIcon} className="inline w-5 h-5 font-thin" />
              </span>
              {bannerData.subtitle}
            </p>
          </div>
        </div>
      )}
      <Outlet />
    </>
  );
};

export default CommonBannerLayout;
