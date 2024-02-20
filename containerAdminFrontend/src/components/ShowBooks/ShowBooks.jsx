import React, { useEffect, useState } from "react";

import { api } from "../../api/admin";
import BookComponent from "../BookComponent/BookComponent";

const ShowBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    api
      .get("/admin/getBooks")
      .then((result) => {
        setBooks(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "20px" }}>Books Available In Library</h1>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {books.map((element) => {
          // console.log(element);
          return (
            <BookComponent
              bookID={element._id}
              bookName={element.bookName}
              bookAuthor={element.bookAuthor}
              bookPrice={element.bookPrice}
              bookUser={element.currentUser}
              api={api}
              route={""}
              word={"Available"}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ShowBooks;
