import React, { useState } from "react";
import "./task.css";
import Newtask from "./Newtask";
function Task({ data, handleCheckBoxClick }) {
  const [isOpen, setIsOpen] = useState(false);

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
          <button className="remove">Remove</button>
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
