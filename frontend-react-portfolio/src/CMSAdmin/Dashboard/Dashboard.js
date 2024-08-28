import { Link } from "react-router-dom";
import useFetch from "../../Components/useFetch";

const Dashboard = () => {
  const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

  const { data: formsList, error } = useFetch(`${API_URL}/api/dashboard`);
  // console.log("Form List:", formsList);
  if (error) {
    console.error("Error fetching dashboard data:", error);
    return <p>Failed to load dashboard data</p>;
  }

  return (
    <>
      {formsList && (
        <section id="dashboard" className="">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="title-box text-center">
                  <h3 className="title-a">FORMS</h3>
                  <p className="subtitle-a">Navigate to Any Form</p>
                  <div className="line-mf" />
                </div>
              </div>
            </div>
            <div className="row">
              {formsList.map((formItem) => (
                <div className="col-md-4" key={formItem._id}>
                  <div className="service-box">
                    <div className="service-ico">
                      <span className="ico-circle">
                        <i className={formItem.Icon} />
                      </span>
                    </div>
                    <div className="service-content">
                      <h2 className="s-title">{formItem.Title}</h2>
                      <p className="s-description text-center">
                        <Link to={formItem.link} className="link-item">
                          {formItem.Description}
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Dashboard;
