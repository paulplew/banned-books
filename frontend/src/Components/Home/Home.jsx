import React, { useRef, useEffect } from "react";
import { Runtime, Inspector } from "@observablehq/runtime";
import notebook from "abc2253b659f06bf";

const Home = () => {
  const plotRef = useRef();

  useEffect(() => {
    const runtime = new Runtime();
    runtime.module(notebook, (name) => {
      if (name === "plot") return new Inspector(plotRef.current);
    });
    return () => runtime.dispose();
  }, []);

  return (
    <>
      <div
        style={{
          padding: "40px",
          display: "flex",
          justifyContent: "center",
          height: "80%",
          overflow: "scroll",
        }}
      >
        <div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h1>Banned books in the United States</h1>
          </div>
          <div
            style={{
              maxWidth: "400px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <p style={{ color: "#dddddd" }}>
              The Boston Public Library (BPL) is joining with local artist Paul
              Plew to expose censorship and book banning in the United States. A
              new exhibit is set to be unveiled in the central branch of the
              public library that raises awarness for banning books in the
              United States.
            </p>
          </div>

          <div>
            <div ref={plotRef} />
            <p style={{ color: "#dddddd" }}>
              Credit:{" "}
              <a
                href="https://observablehq.com/d/abc2253b659f06bf@640"
                style={{ color: "#f88843" }}
              >
                U.S. State Banned Books by Paul Plew
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
