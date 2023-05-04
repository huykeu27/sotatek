import React, { useState } from "react";
import "./newtask.css";
function Newtask({ isEdit, dataEdit }) {
  const [title, setTile] = useState();
  const [desc, setDisc] = useState();
  const [date, setDate] = useState();
  const [pio, setPio] = useState();

  console.log(date);
  return (
    <div className="new-task">
      <h3>{isEdit ? "" : "New task"}</h3>
      <div className="add-new">
        <input
          value={isEdit ? dataEdit.title : title}
          type="text"
          className="input-title"
          placeholder="Add new task..."
        />
      </div>
      <div className="input-desc">
        <label htmlFor="desc">Description</label>
        <textarea
          name=""
          id="desc"
          cols="30"
          rows="10"
          value={isEdit ? dataEdit.description : desc}
        ></textarea>
      </div>
      <div className="choose">
        <div className="choose-date">
          <label htmlFor="date">Due Date</label>
          <input
            type="date"
            id="date"
            value={isEdit ? dataEdit.date : date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="choose-pio">
          <label htmlFor="pio">Piority</label>
          <select
            name=""
            id="pio"
            value={isEdit ? dataEdit.pio : pio}
            defaultValue="normal"
          >
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="hight">Hight</option>
          </select>
        </div>
      </div>
      <button>{isEdit ? "Update" : "Add"}</button>
    </div>
  );
}

export default Newtask;
