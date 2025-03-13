const CVPreview = ({ preview }) => {
  return preview ? (
    <div className="cv-Preview container">
      <iframe
        src={preview}
        width="100%"
        height="800px"
        title="CV Preview"
        className="cv-preview border border-dark  border-5 "
      ></iframe>
    </div>
  ) : (
    <p className="cv-para">No CV uploaded yet.</p>
  );
};

export default CVPreview;
