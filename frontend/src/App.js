import React, { useState, useEffect } from "react";

import Home from "./Components/Home/Home.jsx";
import Display from "./Components/Display/Display.jsx";
import Projection from "./Components/Projection/Projection.jsx";
import BookProvider from "./Contexts/BookContext";

function App() {
  const [route, setRoute] = useState(window.location.pathname);
  const [content, setContent] = useState(<Home />);

  const handleLinkClick = (path) => {
    window.history.pushState({}, path, window.location.origin + path);
    setRoute(path);
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
        <button onClick={() => handleLinkClick("/")}>Home</button>
        <button onClick={() => handleLinkClick("/projection")}>
          Projection
        </button>
        <button onClick={() => handleLinkClick("/display")}>Display</button>
      </nav>
      <BookProvider>{content}</BookProvider>;
    </>
  );
}

export default App;
