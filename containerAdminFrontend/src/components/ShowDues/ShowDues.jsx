import React, { useEffect, useState } from "react";
import { api } from "../../api/admin";

const ShowDues = () => {
  const [books, setBooks] = useState([]);
  const [display, setDisplay] = useState(false);
  const [user, setUser] = useState(null);
  const [selectBook, setSelectBook] = useState("");

  useEffect(() => {
    api
      .get("/admin/getDueList")
      .then((result) => {
        setBooks(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleUser = (element) => {
    setSelectBook(element._id);
    api
      .post("/admin/getDueStudentData", { id: element.currentUser })
      .then((result) => {
        console.log(result.data);
        setUser(result.data);
        setDisplay(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeDue = () => {
    api
      .post("/admin/removeDue", { bookID: selectBook, userID: user._id })
      .then((result) => {
        alert("Done!");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "20px" }}>List of Students with Dues</h1>
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "90vh",
          alignItems: "center",
          justifyContent: "spaceBetween",
        }}
      >
        <div style={{ width: "60%", height: "100%" }}>
          <table>
            <tbody>
              <tr>
                <th
                  style={{ width: "300px", height: "70px", textAlign: "start" }}
                >
                  Book Name
                </th>
                <th
                  style={{ width: "300px", height: "70px", textAlign: "start" }}
                >
                  User
                </th>
              </tr>
              {books.map((element) => {
                return (
                  <tr>
                    <td style={{ width: "300px", height: "70px" }}>
                      {element.bookName}
                    </td>
                    <td>
                      <button
                        onClick={() => handleUser(element)}
                        style={{
                          width: "200px",
                          height: "50px",
                          background: "transparent",
                          border: "1px solid black",
                          borderRadius: "20px",
                          cursor: "pointer",
                        }}
                      >
                        Show User
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {display && (
          <div
            style={{
              width: "40%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              backgroundColor: "#f0f0f0",
              paddingTop: "50px",
              gap: "40px",
            }}
          >
            <div
              style={{
                width: "200px",
                height: "200px",
                backgroundColor: "grey",
                borderRadius: "50%",
              }}
            ></div>
            <p>Name: {user?.username}</p>
            <p>Email: {user?.email}</p>
            <p>Phone: {user?.phone}</p>
            <p>Regno: {user?.regno}</p>
            <button
              onClick={() => removeDue()}
              style={{
                width: "200px",
                height: "50px",
                background: "transparent",
                border: "1px solid black",
                borderRadius: "20px",
                cursor: "pointer",
              }}
            >
              Remove Due
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowDues;
