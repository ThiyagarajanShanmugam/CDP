import React from "react";
import { useEffect, useState } from "react";

import { api } from "../../api/student";

import BookComponent from "../../components/BookComponent/BookComponent";
import { Link, useNavigate } from "react-router-dom";

import "./StudentDashboard.css";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [onSearch, setOnSearch] = useState(false);
  const [currentOutput, setCurrentOutput] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/studentAuth")
      .then((result) => {
        console.log(result);
        if (result.data.msg === "valid") {
          setLoading(false);
        } else {
          window.location.href="http://localhost:5000/login";
        }
      })
      .catch((err) => {
        window.location.href="http://localhost:5000/login";
      });
  }, []);

  useEffect(() => {
    api
      .get("/student/getBooks")
      .then((result) => {
        console.log(result);
        setBooks(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSearch = () => {
    if (search === "") {
      setOnSearch(false);
      setCurrentOutput(null);
    } else {
      api
        .post("/student/getSingleBook", { bookname: search })
        .then((result) => {
          console.log(result);
          setCurrentOutput(result.data);
          setOnSearch(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="StudentDashboard">
      <div className="StudentDashboard-Navbar">
        <button>
          <Link to="/profile">Profile</Link>
        </button>
        <button style={{marginLeft: "20px"}}>
          <a href="http://localhost:5000/login">Logout</a>
        </button>
      </div>
      <div className="StudentDashboard-Main">
        <h1>Books</h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
          }}
          className="StudentDashboard-SearchBar"
        >
          <input
            type="text"
            placeholder="Search Books"
            value={search}
            style={{
              width: "500px",
              height: "30px",
              marginRight: "10px",
              paddingLeft: "10px",
            }}
            onChange={(event) => setSearch(event.target.value)}
          />
          <button
            style={{ width: "70px", height: "30px" }}
            onClick={() => handleSearch()}
          >
            Search
          </button>
        </div>
        {!onSearch && (
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
                  route={"/student/bookData"}
                  word={"Request"}
                />
              );
            })}
          </div>
        )}
        {onSearch && (
          <div>
            {currentOutput === null && <p>Not Found!</p>}
            {currentOutput !== null && (
              <BookComponent
                bookName={currentOutput.bookName}
                bookAuthor={currentOutput.bookAuthor}
                bookPrice={currentOutput.bookPrice}
                bookUser={currentOutput.currentUser}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
