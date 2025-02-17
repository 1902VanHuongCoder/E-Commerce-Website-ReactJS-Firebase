import React from "react";
import { MoonLoader } from "react-spinners";
const Loading = ({ loading }) => {
  const override = {
    display: "block",
  };
  return (
    <div className="w-screen h-screen bg-white fixed z-100 top-0 left-0 flex justify-center items-center">
      <MoonLoader
        aria-label="Loading Spinner"
        size={38}
        color="#091F5B"
        speedMultiplier={1}
        data-testid="loader"
        loading={loading}
        css={override}
      />
    </div>
  );
};

export default Loading;
