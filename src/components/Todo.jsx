import React, { useEffect, useState } from "react";
import "./todo.css";
import test from "../assets/test.json";
import Task from "./Task";
const Todo = () => {
  const [isCheckedIds, setIsCheckedIds] = useState([]);
  const [search, setSearch] = useState(null);
  const [todos, setTodos] = useState([]);
  const [taskFilter, setTaskFilter] = useState();

  useEffect(() => {
    getTodosFromLocalStorage();
  }, []);

  const getTodosFromLocalStorage = () => {
    const storedTodos = localStorage.getItem("tasks");
    if (storedTodos === null) {
      const defaultTodos = []; // danh sách todos mặc định
      localStorage.setItem("tasks", JSON.stringify(defaultTodos));
      return defaultTodos;
    }
    setTodos(JSON.parse(storedTodos));
  };

  const handleCheckBoxClick = (e) => {
    let check = e.target.value;
    if (isCheckedIds.includes(check)) {
      setIsCheckedIds(isCheckedIds.filter((item) => item !== check));
    } else {
      setIsCheckedIds([...isCheckedIds, check]);
    }
  };

  useEffect(() => {
    const result = todos?.filter((value) => {
      return value.title?.toLowerCase().match(search?.toLowerCase());
    });
    setTaskFilter(result);
  }, [search, todos]);

  return (
    <div className="todo">
      <h3>To Do List</h3>
      <div className="search">
        <input
          type="text"
          className="search-input"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="list-todo">
        {taskFilter &&
          taskFilter?.length > 0 &&
          taskFilter?.map((item) => (
            <div key={item.id}>
              <Task data={item} handleCheckBoxClick={handleCheckBoxClick} />
            </div>
          ))}
      </div>
      {isCheckedIds && isCheckedIds.length > 0 && (
        <div className="bulk-action ">
          <span>Bulk action:</span>
          <div className="action">
            <button className="done">Done</button>
            <button className="remove">Remove</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Todo;
