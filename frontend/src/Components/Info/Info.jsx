import React, { useContext } from "react";
import { BookContext } from "../../Contexts/BookContext";

const Info = () => {
  const { author, title, description } = useContext(BookContext);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "black",
        color: "rgb(200, 200, 200)",
      }}
    >
      <h1>{author}</h1>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default Info;
