import React from "react";

import "./home.css";
import Newtask from "../components/Newtask";
import Todo from "../components/Todo";
const Home = () => {
  return (
    <>
      <div className="main">
        <div className="main-left">
          <Newtask />
        </div>
        <div className="main-right">
          <Todo />
        </div>
      </div>
    </>
  );
};

export default Home;
