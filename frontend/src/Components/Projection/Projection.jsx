import React, { useContext, useEffect } from "react";
import p5 from "p5";
import projectionSketch from "./projectionSketch.js";
import { BookContext } from "../../Contexts/BookContext.js";

const Projection = () => {
  const { subjects } = useContext(BookContext);

  useEffect(() => {
    const renderer = new p5((s) => projectionSketch(s, subjects));
    return () => renderer.remove();
  }, [subjects]);

  return (
    <div
      id="projection-container"
      style={{
        height: "100%",
        width: "100%",
      }}
    ></div>
  );
};

export default Projection;
