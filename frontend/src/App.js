import React, { useState, useEffect } from "react";

import Home from "./Components/Home/Home.jsx";
import Display from "./Components/Display/Display.jsx";
import Projection from "./Components/Projection/Projection.jsx";
import BookProvider from "./Contexts/BookContext";

function App() {
  const [route, setRoute] = useState(window.location.pathname);
  const [content, setContent] = useState(<Home />);
  const [selected, setSelected] = useState("home");

  const handleLinkClick = (path) => {
    window.history.pushState({}, path, window.location.origin + path);
    setRoute(path);
    setSelected(path);
    console.log(path);
  };

  useEffect(() => {
    switch (route) {
      case "/":
        setContent(<Home />);
        break;
      case "/display":
        setContent(<Display />);
        break;
      case "/projection":
        setContent(<Projection />);
        break;
      default:
        setContent(
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Not Found
          </div>,
        );
    }
  }, [route]);

  useEffect(() => {
    const handlePopState = () => setRoute(window.location.pathname);
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <>
      <nav>
        <div
          className={selected === "/" ? "selected button" : "button"}
          onClick={() => handleLinkClick("/")}
        >
          Home
        </div>
        <div
          className={selected === "/projection" ? "selected button" : "button"}
          onClick={() => handleLinkClick("/projection")}
        >
          Projection
        </div>
        <div
          className={selected === "/display" ? "selected button" : "button"}
          onClick={() => handleLinkClick("/display")}
        >
          Display
        </div>
      </nav>
      <BookProvider>{content}</BookProvider>;
    </>
  );
}

export default App;
