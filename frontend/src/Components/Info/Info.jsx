import React, { useContext, useEffect } from "react";
import { BookContext } from "../../Contexts/BookContext";

const fixName = (name) => {
  const names = name.replaceAll(",", "").split(" ");
  return `${names[1]} ${names[0]}`;
};

const Info = () => {
  const { author, title, description } = useContext(BookContext);
  const { resetTime } = useContext(BookContext);

  useEffect(() => {});

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "black",
        color: "rgb(200, 200, 200)",
        maxWidth: "450px",
      }}
    >
      <h1 style={{ margin: "15px 5px", fontSize: "large" }}>{description}</h1>
      <h2 style={{ margin: "5px", alignSelf: "flex-end", textAlign: "right" }}>
        {title}
      </h2>
      <p style={{ margin: "5px", alignSelf: "flex-end" }}>{fixName(author)}</p>
    </div>
  );
};

export default Info;
