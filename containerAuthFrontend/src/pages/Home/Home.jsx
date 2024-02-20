import React from "react";
import "./Home.css";

import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="Home">
      <nav className="Home-nav">
        <ul>
          <Link to="/login">Login</Link>
        </ul>
        <ul>
          <Link to="/signup">SignUp</Link>
        </ul>
      </nav>
      <div className="Home-Main">
        <h1>Welcome to Library Management Application</h1>
      </div>
    </div>
  );
};

export default Home;
