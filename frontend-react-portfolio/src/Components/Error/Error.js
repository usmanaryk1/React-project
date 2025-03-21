import { Link } from "react-router-dom";
import "./Error.css";

const Error = ({ message }) => {
  return (
    <>
      <div className="error-page">
        <div className="container">
          <div className="row">
            <div className="col-xl-4 d-flex flex-column justify-content-center">
              <div className="error">
                <div className="alertimage d-flex">
                  <img src="./assets/img/alert-img.png" alt="Alert" />
                </div>
                <h3>Error</h3>
                <p>{message}!</p>
                <Link to="/">
                  <i className="bi bi-house-fill"></i> Take me Home!
                </Link>
              </div>
            </div>
            <div className="col-xl-8">
              <div className="error-img">
                <img src="./assets/img/error-image.png" alt="error-image" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Error;
