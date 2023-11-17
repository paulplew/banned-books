import React, { useState, useEffect, createContext } from "react";

const fetchBookAPI = async () => {
  const response = await fetch("http://localhost:8080/200");
  return await response.json();
};

export const BookContext = createContext({});

export function BookProvider(props) {
  const [colors, setColors] = useState([]);
  const [image, setImage] = useState([]);
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const myFunction = () => {
      const fetchBook = async () => {
        await fetchBookAPI()
          .then((response) => {
            console.log(response);
            setColors(response["colors"]);
            setImage(response["image"]);
            setAuthor(response["author"]);
            setTitle(response["title"]);
            setDescription(response["description"]);
          })
          .catch((error) => {
            console.error(error);
          });
      };
      fetchBook().catch(console.error);
    };
    myFunction();
    const intervalId = setInterval(myFunction, 120000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <BookContext.Provider
      value={{
        colors,
        image,
        author,
        title,
        description,
      }}
    >
      {props.children}
    </BookContext.Provider>
  );
}

export default BookProvider;
