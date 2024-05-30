import CircularProgressBar from "@/components/CircularProgressBar";
import React from "react";

const Loading = () => {
  return (
    <CircularProgressBar
      percentage={10}
      size={80}
      strokeWidth={12}
      color="white"
    />
  );
};

export default Loading;
