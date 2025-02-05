import React, { useState, useEffect } from "react";
import Lottie from "react-lottie";

const LottieComponent = (props: any) => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch(props.url)
      .then((response) => response.json())
      .then((data) => setAnimationData(data));
  }, [props.url]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="lottie-container">
      <Lottie
        options={defaultOptions}
        height={props.height}
        width={props.width}
      />
    </div>
  );
};

export default LottieComponent;
