const ImageUpload = ({
  index,
  register,
  base64Image,
  handleImageClick,
  imageRefs,
  handleImageChange,
  removeImage,
}) => {
  return (
    <>
      <div className="image-upload">
        {/* Image or default placeholder */}
        <div className="image-preview" onClick={() => handleImageClick(index)}>
          <img
            src={base64Image || "../../assets/img/default-work-image.webp"}
            alt="default"
            className="img-display"
          />
        </div>

        {/* File input */}
        <input
          type="file"
          name={`file${index}`}
          {...register(`file${index}`)}
          onChange={(e) => handleImageChange(e, index)}
          ref={(el) => (imageRefs.current[index] = el)}
          style={{ display: "none" }}
        />
      </div>
    </>
  );
};

export default ImageUpload;
