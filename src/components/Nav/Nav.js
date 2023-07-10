import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg bg-info">
      <div className="container-fluid">
        <Link className="navbar-brand" to={"/transactions"}>
          Budget App
        </Link>
        <Link to={"/transactions"} className="nav-link">
          <button className="btn btn-outline-dark">Home</button>
        </Link>
        <Link className="d-flex nav-link" to={"/transactions/new"}>
          <button className="btn btn-outline-dark">New Transaction</button>
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
