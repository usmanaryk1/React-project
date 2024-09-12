import { Link } from "react-router-dom";
import "./404Page.css";

const NotFound = () => {
  return (
    <>
      <div id="notfound">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="notfound">
                <div className="notfound-404">
                  <h1>404</h1>
                </div>
                <h2>We are sorry, page not found!</h2>
                <p className="mb-5">
                  The page you are looking for might have been removed, had its
                  name changed or is temporarily unavailable
                </p>
                <Link to="/">Take to Home</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
