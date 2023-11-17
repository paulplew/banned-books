import "./display.css";

import React from "react";
import Background from "../Background/Background.jsx";
import Info from "../Info/Info.jsx";

const Display = () => {
  document.title = "Unraveling Babel";

  return (
    <div className="container">
      <Background />
      <Info />
    </div>
  );
};

export default Display;
