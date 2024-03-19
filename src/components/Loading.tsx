"use client";

import { RotatingLines } from "react-loader-spinner";

function Loading() {
  return (
    <div className="flex justify-center items-center">
      <RotatingLines
        visible={true}
        width="96"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
      />
    </div>
  );
}

export default Loading;
