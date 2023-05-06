import React, { useState } from "react";
import "./task.css";
import { setFlag } from "../store/actions/appAction";
import Newtask from "./Newtask";
import { useDispatch, useSelector } from "react-redux";
function Task({ data, handleCheckBoxClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { flag } = useSelector((state) => state.app);
  const getTodosFromLocalStorage = () => {
    const storedTodos = localStorage.getItem("tasks");
    if (storedTodos === null) {
      const defaultTodos = []; // danh sách todos mặc định
      localStorage.setItem("tasks", JSON.stringify(defaultTodos));
      return defaultTodos;
    }
    return JSON.parse(storedTodos);
  };

  const handleRemoveTask = (id) => {
    if (window.confirm("Are you sure")) {
      const todos = getTodosFromLocalStorage();
      const filterTodos = todos.filter((item) => item.id !== id);
      const updateTodos = [...filterTodos];
      localStorage.setItem("tasks", JSON.stringify(updateTodos));
      dispatch(setFlag(!flag));
    }
  };
  return (
    <div className="task">
      <div className="general">
        <div className="content">
          <input
            type="checkbox"
            id="check"
            value={data.id}
            onChange={handleCheckBoxClick}
          />
          <label htmlFor="check">{data.title}</label>
        </div>
        <div className="action">
          <button className="detail" onClick={() => setIsOpen(!isOpen)}>
            Detail
          </button>
          <button className="remove" onClick={() => handleRemoveTask(data.id)}>
            Remove
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="open-detail">
          <Newtask isEdit={true} dataEdit={data} />
        </div>
      )}
    </div>
  );
}

export default Task;
