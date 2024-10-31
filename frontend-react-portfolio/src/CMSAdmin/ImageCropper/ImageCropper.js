// ImageCropper.js
import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import "./ImageCropper.css"; // Include any styles
import getCroppedImg from "./GetCroppedImage";

const ImageCropper = ({ imageSrc, onCropComplete, onClose }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropChange = (location) => setCrop(location);
  const onZoomChange = (newZoom) => setZoom(newZoom);

  const handleCropComplete = useCallback(async () => {
    console.log("croppedAreaPixels", croppedAreaPixels);
    if (croppedAreaPixels) {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      console.log("croppedImage", croppedImage);

      onCropComplete(croppedImage); // Pass the cropped image data to the parent component
      onClose(); // Close the cropper modal
    }
  }, [croppedAreaPixels, imageSrc, onCropComplete, onClose]);

  const onCropAreaChange = useCallback(
    (_, pixels) => setCroppedAreaPixels(pixels),
    []
  );

  return (
    <div className="cropper-container">
      <Cropper
        image={imageSrc}
        crop={crop}
        zoom={zoom}
        aspect={1}
        onCropChange={onCropChange}
        onZoomChange={onZoomChange}
        onCropComplete={onCropAreaChange}
      />
      <div className="cropper-controls">
        <button onClick={handleCropComplete} className="crop">
          Crop
        </button>
        <button onClick={onClose} className="cancel">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ImageCropper;
