import React from "react";
import "./image.css";
const ImageDisplay = ({ images, title }) => {
  return (
    <div>
      {images.length > 0 &&
        images.map((imageUrl, index) => (
          <div className="imageDisplay" key={index}>
            <p>
              {title} {index + 1}:
            </p>
            {imageUrl !== "No image URL found in the output." ? (
              <img
                src={imageUrl}
                alt={`${title} ${index + 1}`}
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

export default ImageDisplay;
