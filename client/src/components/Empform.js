import React from "react";
import "../App.css";
import { IoMdClose } from "react-icons/io";

const Empform = ({ handleSubmit, handleOnChange, handleclose, rest, isUpdate }) => {
  return (
    <div className="add-container">
      <form onSubmit={handleSubmit}>
        <div className="close-btn" onClick={handleclose}>
          <IoMdClose />
        </div>
        <label htmlFor="name">Name :</label>
        <input
          type="text"
          name="name"
          id="name"
          onChange={handleOnChange}
          value={rest.name}
        />

        <label htmlFor="email">Email :</label>
        <input
          type="text"
          name="email"
          id="email"
          onChange={handleOnChange}
          value={rest.email}
        />

        <label htmlFor="mobile">Mobile :</label>
        <input
          type="text"
          name="mobile"
          id="mobile"
          onChange={handleOnChange}
          value={rest.mobile}
        />

        {isUpdate ? (
          <button className="btn" type="submit">
            Update
          </button>
        ) : (
          <button className="btn" type="submit">
            Submit
          </button>
        )}
      </form>
    </div>
  );
};

export default Empform;
