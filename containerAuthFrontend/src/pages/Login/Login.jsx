import React, { useState } from "react";

import { api } from "../../api/auth";
import { Link, useNavigate } from "react-router-dom";

import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    api
      .post("/auth/getData", {
        email: email,
        password: password,
      })
      .then((result) => {
        console.log(result);
        if (result.status === 201) {
          if (result.data.type === "student") {
            window.location.href="http://localhost:5001/student";
          } else if (result.data.type === "admin") {
            window.location.href="http://localhost:5002/admin";
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="Login">
      <nav>
        <ul>
          <Link to="/">&#8592; Home</Link>
        </ul>
      </nav>
      <div className="Login-Main-Container">
        <div className="Login-Main">
          <h1>LOGIN</h1>
          <div className="Login-Main-Input">
            <input
              type="email"
              value={email}
              placeholder="Email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>
          <p>
            New to Application? <Link to="/signup">Register</Link>
          </p>
          <button type="button" onClick={() => handleSubmit()} className="Login-Button">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
