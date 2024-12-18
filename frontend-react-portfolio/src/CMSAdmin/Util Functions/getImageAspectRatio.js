export const getImageAspectRatio = (imageSrc) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const aspect = img.width / img.height;
      resolve(aspect);
    };
    img.src = imageSrc;
  });
};
