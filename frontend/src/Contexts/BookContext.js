import React, { useState, useEffect, createContext } from "react";

const fetchBookAPI = async () => {
  const response = await fetch("http://localhost:8080/books/200");
  return await response.json();
};

const fetchSubjectsAPI = async () => {
  const response = await fetch("http://localhost:8080/subjects");
  return await response.json();
};

export const BookContext = createContext({});

export function BookProvider(props) {
  const [colors, setColors] = useState([]);
  const [image, setImage] = useState([]);
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [resetTime, setResetTime] = useState(Date.now());
  const [isbn, setISBN] = useState(0);

  const fetchBook = async () => {
    await fetchBookAPI()
      .then((response) => {
        console.log(response);
        setColors(response["colors"]);
        setImage(response["image"]);
        setAuthor(response["author"]);
        setTitle(response["title"]);
        setDescription(response["description"].slice(0, 240) + "...");
        setISBN(response["isbn"]);
        setResetTime(Date.now());
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const fetchSubjects = async () => {
      await fetchSubjectsAPI()
        .then((response) => {
          setSubjects(response);
        })
        .catch((error) => console.error(error));
    };

    fetchSubjects().catch(console.error);
  }, []);

  return (
    <BookContext.Provider
      value={{
        fetchBook,
        colors,
        image,
        author,
        title,
        description,
        subjects,
        resetTime,
        isbn,
      }}
    >
      {props.children}
    </BookContext.Provider>
  );
}

export default BookProvider;
