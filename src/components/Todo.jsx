import React, { useEffect, useState } from "react";
import "./todo.css";
import Task from "./Task";
import { useDispatch, useSelector } from "react-redux";
import { setFlag } from "../store/actions/appAction";

const Todo = () => {
  const [isCheckedIds, setIsCheckedIds] = useState([]);
  const [search, setSearch] = useState(null);
  const [todos, setTodos] = useState([]);
  const [taskFilter, setTaskFilter] = useState();
  const dispatch = useDispatch();
  const { flag } = useSelector((state) => state.app);

  useEffect(() => {
    const getTodosFromLocalStorage = () => {
      const storedTodos = localStorage.getItem("tasks");
      if (storedTodos === null) {
        const defaultTodos = []; // danh sách todos mặc định
        localStorage.setItem("tasks", JSON.stringify(defaultTodos));
        return defaultTodos;
      }
      const todoSort = JSON.parse(storedTodos).sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      setTodos(todoSort);
    };

    getTodosFromLocalStorage();
  }, [flag]);

  const handleRemoveTasks = () => {
    if (window.confirm("123")) {
      // Lấy ra arr chứa những cái click trong local
      const filterTodos = todos.filter((obj) => {
        return isCheckedIds.some((str) => obj.id === +str);
      });

      // Filter arr không trung nhau giứa thang local và thằng vừa được lấy
      const filteredArr = todos.filter(
        (obj1) => !filterTodos.some((obj2) => obj1.id === obj2.id)
      );

      // Update cái không trùng kia
      const updateTodos = [...filteredArr];
      localStorage.setItem("tasks", JSON.stringify(updateTodos));
      dispatch(setFlag(!flag));
      setIsCheckedIds([]);
    }
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
            <button className="remove" onClick={handleRemoveTasks}>
              Remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Todo;
