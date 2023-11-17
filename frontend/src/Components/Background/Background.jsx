import React, { useContext, useEffect } from "react";
import p5 from "p5";
import sketch from "./sketch.js";
import { BookContext } from "../../Contexts/BookContext.js";

const Background = () => {
  const { colors, image } = useContext(BookContext);

  useEffect(() => {
    const renderer = new p5((s) => sketch(s, colors, image));
    return () => renderer.remove();
  }, [colors, image]);

  return (
    <div
      id="background"
      style={{
        height: "calc(100vh - 10px)",
        minWidth: "calc(50vw + 10px)",
        margin: "5px",
      }}
    ></div>
  );
};

export default Background;
