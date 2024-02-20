import React, { useState } from "react";

import { api } from "../../api/auth";

import { Link, useNavigate } from "react-router-dom";

import "./SignUp.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [regno, setRegno] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("student");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {
    console.log(email, password, username, regno, phone, type, confirmPassword);
    if (password !== confirmPassword) {
      alert("Passwords don't Match!");
    }
    api
      .post("/auth/addUser", {
        email: email,
        password: password,
        username: username,
        regno: regno,
        phone: phone,
        userType: type,
      })
      .then((result) => {
        console.log(result);
        if (result.status === 201) {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="Register">
      <nav>
        <ul>
          <Link to="/">Home</Link>
        </ul>
      </nav>
      <div className="Register-Main-Container">
        <div className="Register-Main">
          <h1>Register</h1>
          <div className="Register-Main-Input">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Full Name"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Reg Number"
              value={regno}
              onChange={(event) => {
                setRegno(event.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(event) => {
                setPhone(event.target.value);
              }}
            />
            <select
              name="type"
              id=""
              onChange={(event) => {
                setType(event.target.value);
              }}
            >
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(event) => {
                setConfirmPassword(event.target.value);
              }}
            />
            <p>
              Already have an Account? <Link to="/login">Login</Link>
            </p>
            <button
              type="button"
              onClick={() => handleSubmit()}
              className="Register-Button"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
