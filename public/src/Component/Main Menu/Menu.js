import React from "react";
// import { useState, useEffect } from "react";
import "./menu.css";
import { Link } from "react-router-dom";
import image from "../Images/mainpage.jpg";
const Menu = () => {
  return (
    <div className="hero">
      <div className="nav">
        <h2>Main Menu</h2>
      </div>

      <div className="main">
        <div className="container1">
          <div className="page">
            <h2 className="heading 1">Create Record</h2>
            <Link className="link" to="/create-record">
              Click Here
            </Link>
          </div>
          <div className="page">
            <h2 className="heading 1">View Record</h2>
            <Link className="link" to="/view-record">
              Click Here
            </Link>
          </div>
          <div className="page">
            <h2 className="heading 1">Create Task</h2>
            <Link className="link" to="/create-task">
              Click Here
            </Link>
          </div>
          <div className="page">
            <h2 className="heading 1">Create Form</h2>
            <Link className="link" to="/create-form">
              Click Here
            </Link>
          </div>
          <div className="page">
            <h2 className="heading 1">View Task List</h2>
            <a className="link" href="#a">
              Click Here
            </a>
          </div>
        </div>
        <div className="container">
          <img className="img" src={image} alt="img1"></img>
        </div>
      </div>
    </div>
  );
};
export default Menu;
