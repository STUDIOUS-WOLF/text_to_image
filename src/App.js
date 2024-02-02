import React, { useState } from "react";
import axios from "axios";
import EditImageForm from "./components/EditImageForm";
import GenerateImageForm from "./components/GenerateImageForm";
import ImageDisplay from "./components/ImageDisplay";
import "./App.css";
const App = () => {
  // const [prompt, setPrompt] = useState("");
  // const [editPrompt, setEditPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState([]);
  const [editImageUrl, setEditImageUrl] = useState([]);
  // const handleSubmit = async (event) => {
  const handleGenerateImage = async (prompt) => {
    // event.preventDefault();
    const apiKey = process.env.REACT_APP_API_KEY;
    try {
      console.log("API Key:", apiKey);
      console.log("Prompt:", prompt);
      const response = await axios.post(
        "https://stablediffusionapi.com/api/v3/text2img",
        {
          key: apiKey,
          prompt: prompt,
          width: "512",
          height: "512",
          samples: "2",
          num_inference_steps: "20",
          guidance_scale: 7.5,
          safety_checker: "yes",
          multi_lingual: "no",
          panorama: "no",
          self_attention: "no",
          upscale: "no",
          embeddings_model: null,
          webhook: null,
          track_id: null,
        }
      );
      console.log("Response:", response);

      const result = response.data;
      const outputUrls = result.output || [];

      if (outputUrls.length > 0) {
        const imageUrl = outputUrls;

        setImageUrl(imageUrl);
      } else {
        setImageUrl("No image URL found in the output.");
      }
    } catch (error) {
      setImageUrl(`Error: ${error.message}`);
    }
  };

  // this is for editing previously generated image

  // const handleEditImage = async (event) => {
  const handleEditImage = async (editPrompt) => {
    // event.preventDefault();
    const apiKey = process.env.REACT_APP_API_KEY;
    const prevImageUrl = imageUrl[0];
    try {
      const response = await axios.post(
        "https://stablediffusionapi.com/api/v3/img2img",
        {
          key: apiKey,
          prompt: editPrompt,
          negative_prompt: null,
          init_image: prevImageUrl,
          width: "512",
          height: "512",
          samples: "1",
          num_inference_steps: "30",
          safety_checker: "no",
          enhance_prompt: "yes",
          guidance_scale: 7.5,
          strength: 0.7,
          base64: "no",
          seed: null,
          webhook: null,
          track_id: null,
        }
      );
      console.log("Response:", response);

      const result = response.data;
      const outputUrls = result.output || [];

      if (outputUrls.length > 0) {
        const imageUrl = outputUrls;

        setEditImageUrl(imageUrl);
      } else {
        setEditImageUrl("No image URL found in the output.");
      }
    } catch (error) {
      setEditImageUrl(`Error: ${error.message}`);
    }
  };

  return (
    <div className="container">
      <h1>Text to Image Converter</h1>

      <GenerateImageForm onGenerateImage={handleGenerateImage} />

      <ImageDisplay images={imageUrl} title="Generated Image" />

      {imageUrl.length > 0 && <EditImageForm onEditImage={handleEditImage} />}

      <ImageDisplay images={editImageUrl} title="Edited Image" />
    </div>
  );
};

export default App;
