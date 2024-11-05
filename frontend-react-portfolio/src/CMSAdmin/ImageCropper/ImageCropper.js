// ImageCropper.js
import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import "./ImageCropper.css"; // Include any styles
import getCroppedImg from "./GetCroppedImage";

const ImageCropper = ({
  imageSrc,
  fileName,
  onCropComplete,
  onClose,
  width,
  height,
  cropShape,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  console.log("fileName in cropper", fileName);
  const onCropChange = (location) => setCrop(location);
  const onZoomChange = (newZoom) => setZoom(newZoom);
  const aspectRatio = width / height; // Calculate aspect ratio

  const handleCropComplete = useCallback(async () => {
    console.log("croppedAreaPixels", croppedAreaPixels);
    if (croppedAreaPixels) {
      const croppedImg = await getCroppedImg(
        imageSrc,
        fileName,
        croppedAreaPixels
      );
      console.log("croppedImg in cropper", croppedImg);

      onCropComplete(croppedImg); // Pass the cropped image data to the parent component
      onClose(); // Close the cropper modal
    }
  }, [croppedAreaPixels, imageSrc, fileName, onCropComplete, onClose]);

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
        aspect={aspectRatio} // Use the dynamic aspect ratio
        onCropChange={onCropChange}
        onZoomChange={onZoomChange}
        onCropComplete={onCropAreaChange}
        cropShape={cropShape} // Apply the shape here
      />
      <div className="cropper-controls">
        <button type="button" onClick={handleCropComplete} className="crop">
          Crop
        </button>
        <button type="button" onClick={onClose} className="cancel">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ImageCropper;
