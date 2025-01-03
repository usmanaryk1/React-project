export default function getCroppedImg(imageSrc, fileName, croppedAreaPixels) {
  return new Promise((resolve) => {
    const image = new Image();
    // console.log("image", image);
    image.crossOrigin = "anonymous"; // Avoid CORS issues for external URLs
    image.src = imageSrc;
    // console.log("FILE NAME", fileName);
    image.onload = () => {
      if (!croppedAreaPixels.width || !croppedAreaPixels.height) {
        console.error("Invalid cropped area dimensions");
        resolve(null);
        return;
      }

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Set canvas dimensions based on cropped area
      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;

      // Draw the cropped image
      ctx.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      );

      const mimeType = image.src.startsWith("data:")
        ? image.src.split(";")[0].split(":")[1]
        : "image/jpeg";

      // Get the blob from the canvas
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const file = new File([blob], fileName, { type: mimeType });
            resolve(file); // Return the cropped image as a File object
          } else {
            console.error("Canvas is empty");
            resolve(null);
          }
        },
        mimeType,
        1
      );
    };
    image.onerror = () => {
      console.error("Failed to load image");
      resolve(null);
    };
  });
}
