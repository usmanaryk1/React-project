import { Link } from "react-router-dom";
import "./NullData.css";

const NullData = ({ message, link, redirect_to }) => {
  return (
    <>
      <section className="null-data">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="data-message">
                <p>Add Your First {message}!</p>
                <Link to={link}>
                  <i className="bi bi-house-fill"></i> Take me to {redirect_to}
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
