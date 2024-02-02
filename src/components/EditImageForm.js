import React, { useState } from "react";
import "./form.css";
const EditImageForm = ({ onEditImage }) => {
  const [editPrompt, setEditPrompt] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditImage(editPrompt);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="editPrompt">Enter Edit Prompt:</label>
      <input
        className="input"
        type="text"
        id="editPrompt"
        name="editPrompt"
        value={editPrompt}
        onChange={(e) => setEditPrompt(e.target.value)}
        required
      />
      <button className="button" type="submit">
        Edit Image
      </button>
    </form>
  );
};

export default EditImageForm;
