import React from "react";
import "./todo.css";
import test from "../assets/test.json";
import Task from "./Task";
const Todo = () => {
  console.log(test);
  return (
    <div className="todo">
      <h3>To Do List</h3>
      <div className="search">
        <input type="text" className="search-input" placeholder="Search..." />
      </div>
      <div className="list-todo">
        {test.map((item) => (
          <div key={item.id}>
            <Task data={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;
