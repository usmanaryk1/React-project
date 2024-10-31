import React, { useState, useRef } from "react";
import Resizer from "react-image-file-resizer"; // Import the image resizer

const ImageResizer = ({
  onImageResize,
  width,
  height,
  format,
  quality,
  defaultImage,
  label,
}) => {
  const [imageFile, setImageFile] = useState(null);
  const [base64Image, setBase64Image] = useState("");
  const fileInputRef = useRef(null); // Create a ref for the file input

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const resizedImage = await resizeImage(file);
      setBase64Image(resizedImage.base64);
      setImageFile(resizedImage.file);
      onImageResize(resizedImage.file, resizedImage.base64); // Pass the resized image to the parent
    }
  };

  const resizeImage = (file) => {
    return new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        width, // width from props
        height, // height from props
        format, // format from props
        quality, // quality from props
        0, // rotation
        (uri) => {
          resolve({ base64: uri, file });
        },
        "base64"
      );
    });
  };

  return (
    <div className="image-resizer text-center mb-4">
      <div onClick={() => fileInputRef.current.click()}>
        {" "}
        {/* Trigger file input on div click */}
        {imageFile ? (
          <img
            src={URL.createObjectURL(imageFile)}
            alt=""
            className="img-display"
          />
        ) : (
          <img
            src={base64Image || defaultImage}
            alt="default"
            className="img-display"
          />
        )}
        <input
          type="file"
          ref={fileInputRef} // Set the ref to the file input
          accept="image/*"
          style={{ display: "none" }} // Hide the file input
          onChange={handleImageChange}
          required
        />
      </div>
      <label className="my-3">
        <b>Choose {label} Image</b>
      </label>
    </div>
  );
};

export default ImageResizer;
