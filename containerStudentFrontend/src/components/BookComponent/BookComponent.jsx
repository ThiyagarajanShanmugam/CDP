import React from "react";

const BookComponent = ({
  bookID,
  bookName,
  bookAuthor,
  bookPrice,
  bookUser,
  api,
  route,
  word
}) => {
  const handleSubmit = () => {
    console.log(bookID);
    if (route !== "") {
      api
        .post(route, { bookID: bookID })
        .then((result) => {
          console.log(result);
          window.location.reload();
          alert("Booked!");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  var content = bookUser === "campus" ? word : "Not Available";
  var color = bookUser === "campus" ? "green" : "red";
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        border: "1px solid black",
        width: "200px",
        height: "200px",
        borderRadius: "20px",
        justifyContent: "space-evenly",
        textAlign: "center"
      }}
    >
      <h3>{bookName}</h3>
      <p>{bookAuthor}</p>
      <p>{bookPrice}</p>
      <button
        style={{ backgroundColor: color, width: "100px", height: "30px", border: "none", outline: "none", cursor: "pointer" }}
        onClick={() => {
          if (bookUser === "campus") {
            handleSubmit();
          } else {
            alert("Not Available");
          }
        }}
      >
        {content}
      </button>
    </div>
  );
};

export default BookComponent;
