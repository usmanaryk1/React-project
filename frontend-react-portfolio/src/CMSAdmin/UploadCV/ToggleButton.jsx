const ToggleButton = ({ cv, toggleVisibility }) => {
  return (
    <>
      <div className="toggle-container">
        <button
          onClick={() => toggleVisibility(cv._id)}
          className={`toggle-btn ${cv.isVisible ? "visible" : "hidden"}`}
        >
          <div className="toggle-icon">
            <i
              className={`bi ${
                cv.isVisible ? "bi-toggle-on" : "bi-toggle-off"
              }`}
            ></i>
          </div>
        </button>
      </div>
    </>
  );
};

export default ToggleButton;
