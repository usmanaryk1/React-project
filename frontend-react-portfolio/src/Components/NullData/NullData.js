import { Link } from "react-router-dom";
import "./NullData.css";

const NullData = ({ message }) => {
  return (
    <>
      <section className="null-data">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="data-message">
                <p>Oops! No {message} Available.</p>
                <Link to="/">
                  <i className="bi bi-house-fill"></i> Take me Home!
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NullData;
