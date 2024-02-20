import React, { useState } from "react";
import { api } from "../../api/admin";
import { useNavigate } from "react-router-dom";

const AddBooks = () => {
  const [bookName, setBookName] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookPrice, setBookPrice] = useState("");

  const navigate = useNavigate();

  const handleUpdate = () => {
    api
      .post("/admin/addBook", { bookName, bookAuthor, bookPrice })
      .then((result) => {
        alert("Updated Sucessfully!");
        navigate("/admin");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: "300px",
          height: "30vh",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          border: "1px solid black",
          justifyContent: "space-evenly"
        }}
      >
        <input
          type="text"
          value={bookName}
          placeholder="Book Name"
          onChange={(event) => {
            setBookName(event.target.value);
          }}
          style={{
            width: "200px",
            height: "50px",
            border: "1px solid black",
            padding: "10px",
            borderRadius: "20px",
          }}
        />
        <input
          type="text"
          value={bookAuthor}
          placeholder="Book Author"
          onChange={(event) => {
            setBookAuthor(event.target.value);
          }}
          style={{
            width: "200px",
            height: "50px",
            border: "1px solid black",
            padding: "10px",
            borderRadius: "20px",
          }}
        />
        <input
          type="number"
          value={bookPrice}
          placeholder="Book Price"
          onChange={(event) => {
            setBookPrice(event.target.value);
          }}
          style={{
            width: "200px",
            height: "50px",
            border: "1px solid black",
            padding: "10px",
            borderRadius: "20px",
          }}
        />
        <button
          onClick={() => handleUpdate()}
          style={{
            width: "100px",
            height: "40px",
            background: "transparent",
            border: "1px solid black",
            borderRadius: "10px",
            cursor: "pointer"
          }}
        >
          Add Book
        </button>
      </div>
    </div>
  );
};

export default AddBooks;
