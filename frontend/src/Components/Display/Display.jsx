import "./display.css";

import React from "react";
import Background from "../Background/Background.jsx";

const Display = () => {
  document.title = "Unraveling Babel";

  return (
    <div className="container">
      <Background />
    </div>
  );
};

export default Display;
