import React, { useState } from "react";
import "./newtask.css";
import { useDispatch, useSelector } from "react-redux";
import { setFlag } from "../store/actions/appAction";

function Newtask({ isEdit, dataEdit }) {
  const { flag } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const [payload, setPayload] = useState({
    title: isEdit ? dataEdit.title : "",
    desc: isEdit ? dataEdit.desc : "",
    date: isEdit ? dataEdit.date : new Date().toISOString().split("T")[0],
    pio: isEdit ? dataEdit.pio : "",
  });

  const getTodosFromLocalStorage = () => {
    const storedTodos = localStorage.getItem("tasks");
    if (storedTodos === null) {
      const defaultTodos = []; // danh sách todos mặc định
      localStorage.setItem("tasks", JSON.stringify(defaultTodos));
      return defaultTodos;
    }
    return JSON.parse(storedTodos);
  };

  const handleAddtask = () => {
    const todos = getTodosFromLocalStorage();
    const id = Date.now();
    payload.id = id;
    const updateTodos = [...todos, payload];
    localStorage.setItem("tasks", JSON.stringify(updateTodos));
    setPayload({
      title: "",
      desc: "",
      date: new Date().toISOString().split("T")[0],
      pio: "",
    });
    dispatch(setFlag(!flag));
  };

  const handleUpdateTask = (id) => {
    const todos = getTodosFromLocalStorage();
    const filterTodos = todos.filter((item) => item.id !== id);
    payload.id = id;
    const updateTodos = [...filterTodos, payload];
    localStorage.setItem("tasks", JSON.stringify(updateTodos));
    dispatch(setFlag(!flag));
    alert("Cập nhật công việc thành công");
  };

  return (
    <div className="new-task">
      <h3>{isEdit ? "" : "New task"}</h3>
      <div className="add-new">
        <input
          value={payload.title}
          type="text"
          className="input-title"
          placeholder="Add new task..."
          onChange={(e) =>
            setPayload((prev) => ({ ...prev, title: e.target.value }))
          }
        />
      </div>
      <div className="input-desc">
        <label htmlFor="desc">Description</label>
        <textarea
          name=""
          id="desc"
          cols="30"
          rows="10"
          value={payload.desc}
          onChange={(e) =>
            setPayload((prev) => ({ ...prev, desc: e.target.value }))
          }
        ></textarea>
      </div>
      <div className="choose">
        <div className="choose-date">
          <label htmlFor="date">Due Date</label>
          <input
            min={new Date().toISOString().split("T")[0]}
            type="date"
            id="date"
            // defaultValue={defaultDate}
            value={payload.date}
            onChange={(e) =>
              setPayload((prev) => ({ ...prev, date: e.target.value }))
            }
          />
        </div>

        <div className="choose-pio">
          <label htmlFor="pio">Piority</label>
          <select
            name=""
            id="pio"
            value={payload.pio}
            // defaultValue="normal"
            onChange={(e) =>
              setPayload((prev) => ({ ...prev, pio: e.target.value }))
            }
          >
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="hight">Hight</option>
          </select>
        </div>
      </div>
      <button
        onClick={() =>
          !isEdit ? handleAddtask() : handleUpdateTask(dataEdit?.id)
        }
      >
        {isEdit ? "Update" : "Add"}
      </button>
    </div>
  );
}

export default Newtask;
