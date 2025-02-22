import React from "react";
import banner from "../../assets/showcase.png";
const Banner = ({ data }) => {
  return (
    <div className="w-full h-fit">
      <img src={banner} alt="banner" className="w-full h-auto" />
    </div>
  );
};

export default Banner;
