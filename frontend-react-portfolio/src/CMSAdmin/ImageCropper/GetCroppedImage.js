export default function getCroppedImg(imageSrc, fileName, croppedAreaPixels) {
  return new Promise((resolve) => {
    const image = new Image();
    // console.log("image", image);
    image.src = imageSrc;
    // console.log("FILE NAME", fileName);
    image.onload = () => {
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

      // Get the blob from the canvas
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], fileName, { type: blob.type });
          resolve(file); // Return the cropped image as a File object
        } else {
          console.error("Canvas is empty");
          resolve(null);
        }
      }, image.src.split(";")[0].split(":")[1]);
    };
  });
}
