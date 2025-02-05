import React, { useState, useEffect } from "react";
import Lottie from "react-lottie";

interface LottieComponentProps {
  url: string;
  name: string;
  height: number;
  width: number;
}

const LottieComponent: React.FC<LottieComponentProps> = (props) => {
  const [animationData, setAnimationData] = useState<any>(null);

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
