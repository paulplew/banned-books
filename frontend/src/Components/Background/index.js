import React, { useEffect } from "react";
import p5 from "p5";
import sketch from "./sketch.js";

const Background = () => {
  useEffect(() => {
    new p5(sketch);
  });

  return (
    <div
      id="background"
      style={{
        overflow: "hidden",
        height: "100vh",
        width: "100vw",
        position: "absolute",
        zIndex: "-99",
      }}
    ></div>
  );
};

export default Background;
