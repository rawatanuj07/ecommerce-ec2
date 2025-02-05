import React, { useState, useEffect } from "react";
import Lottie from "react-lottie";

interface LottieComponentProps {
  url: string;
  name: string;
  height: number;
  width: number;
}

interface Asset {
  id: string;
  [key: string]: unknown;
}

interface Layer {
  id: string;
  [key: string]: unknown;
}

interface AnimationData {
  v: string; // version
  fr: number; // frame rate
  ip: number; // in point
  op: number; // out point
  w: number; // width
  h: number; // height
  nm: string; // name
  ddd: number; // 3D
  assets: Asset[]; // assets array
  layers: Layer[]; // layers array
}

const LottieComponent: React.FC<LottieComponentProps> = (props) => {
  const [animationData, setAnimationData] = useState<AnimationData | null>(
    null
  );

  useEffect(() => {
    fetch(props.url)
      .then((response) => response.json())
      .then((data: AnimationData) => setAnimationData(data));
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
      <Lottie options={defaultOptions} height={props.height} width="100%" />
    </div>
  );
};

export default LottieComponent;
