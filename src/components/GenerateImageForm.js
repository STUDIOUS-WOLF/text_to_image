import React, { useState } from "react";
import "./form.css";
const GenerateImageForm = ({ onGenerateImage }) => {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerateImage(prompt);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="prompt">Enter Prompt:</label>
      <input
        className="input"
        type="text"
        id="prompt"
        name="prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        required
      />
      <button className="button" type="submit">
        Generate Image
      </button>
    </form>
  );
};

export default GenerateImageForm;
