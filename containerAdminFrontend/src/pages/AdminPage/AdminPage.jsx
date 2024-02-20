import React, { useEffect, useState } from "react";

import { api } from "../../api/admin";
import { useNavigate, Link } from "react-router-dom";

const AdminPage = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/adminAuth")
      .then((result) => {
        console.log(result);
        if (result.data.msg === "valid") {
          setLoading(false);
        } else {
          window.location.href = "http://localhost:5000/login";
        }
      })
      .catch((err) => {
        window.location.href = "http://localhost:5000/login";
      });
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div
      style={{
        width: "100%",
        height: "400px",
        padding: "30px",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <h1>Welcome to Admin Page</h1>
        <button
          style={{
            marginLeft: "20px",
            width: "200px",
            height: "20px",
            border: "none",
            outline: "none",
            background: "transparent",
          }}
        >
          <a
            href="http://localhost:5000/login"
            style={{
              width: "100%",
              height: "100%",
              background: "transparent",
              border: "1px solid black",
              padding: "10px",
              color: "black",
              textDecoration: "none",
            }}
          >
            Logout
          </a>
        </button>
      </div>
      <div
        style={{
          width: "500px",
          height: "50px",
          border: "1px solid black",
          background: "transparent",
          borderRadius: "20px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Link
          to="/adminShowBooks"
          style={{
            width: "100%",
            height: "100%",
            textAlign: "center",
            textDecoration: "none",
            color: "black",
            borderRadius: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Show Books
        </Link>
      </div>
      <div
        style={{
          width: "500px",
          height: "50px",
          border: "1px solid black",
          background: "transparent",
          borderRadius: "20px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Link
          to="/adminShowDues"
          style={{
            width: "100%",
            height: "100%",
            textAlign: "center",
            textDecoration: "none",
            color: "black",
            borderRadius: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Show Dues
        </Link>
      </div>
      <div
        style={{
          width: "500px",
          height: "50px",
          border: "1px solid black",
          background: "transparent",
          borderRadius: "20px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Link
          to="/adminAddBooks"
          style={{
            width: "100%",
            height: "100%",
            textAlign: "center",
            textDecoration: "none",
            color: "black",
            borderRadius: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Add Books
        </Link>
      </div>
    </div>
  );
};

export default AdminPage;
