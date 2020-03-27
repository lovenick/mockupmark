import React from "react";

import "./Navbar.scss";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <a className="navbar-brand" href="/">
          <img src="/logo.png" alt="Mockup Mark" />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
