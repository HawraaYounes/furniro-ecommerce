import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const CommonBannerLayout = () => {
  const bannerData = useSelector((state) => state.banner);

  return (
    <div>
      {bannerData.title && (
        <div
          className="banner"
          style={{
            backgroundImage: `url(${bannerData.backgroundImage})`,
            padding: "20px",
            color: "white",
            textAlign: "center",
          }}
        >
          <h1>{bannerData.title}</h1>
          <p>{bannerData.subtitle}</p>
        </div>
      )}
      <Outlet />
    </div>
  );
};

export default CommonBannerLayout;
