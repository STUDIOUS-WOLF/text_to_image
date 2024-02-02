import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [prompt, setPrompt] = useState("");
  const [numImages, setNumImages] = useState(1);
  const [imageUrls, setImageUrls] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const apiKey = process.env.REACT_APP_API_KEY;

    try {
      console.log("API Key:", apiKey);
      console.log("Prompt:", prompt);
      console.log("Number of Images:", numImages);

      const response = await axios.post(
        "https://stablediffusionapi.com/api/v3/text2img",
        {
          key: apiKey,
          prompt: prompt,
          width: "512",
          height: "512",
          samples: numImages.toString(),
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
        setImageUrls(outputUrls);
      } else {
        setImageUrls(["No image URL found in the output."]);
      }
    } catch (error) {
      setImageUrls([`Error: ${error.message}`]);
    }
  };

  return (
    <div>
      <h1>Text to Image Converter</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="prompt">Enter Prompt:</label>
          <input
            type="text"
            id="prompt"
            name="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="numImages">Number of Images:</label>
          <input
            type="number"
            id="numImages"
            name="numImages"
            value={numImages}
            onChange={(e) => setNumImages(e.target.value)}
            required
          />
        </div>

        <div>
          <button type="submit">Generate Images</button>
        </div>
      </form>
      {imageUrls.length > 0 &&
        imageUrls.map((imageUrl, index) => (
          <div key={index}>
            <p>Generated Image {index + 1}:</p>
            {imageUrl !== "No image URL found in the output." ? (
              <img
                src={imageUrl}
                alt={`Generated ${index + 1}`}
                style={{ maxWidth: "100%" }}
              />
            ) : (
              <p>{imageUrl}</p>
            )}
          </div>
        ))}
    </div>
  );
};

export default App;
