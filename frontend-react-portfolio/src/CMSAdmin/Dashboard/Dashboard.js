import { Link } from "react-router-dom";
import useFetch from "../../Components/useFetch";
import Loading from "../../Components/Loading/Loading";
import Error from "../../Components/Error/Error";

const Dashboard = () => {
  const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";
  console.log("API_URL:", API_URL);
  const {
    data: formsList,
    error,
    isPending,
  } = useFetch(`${API_URL}/api/dashboard`);
  // console.log("Form List:", formsList);
  if (isPending) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <>
      {formsList && (
        <section id="dashboard" className="">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="title-box text-center">
                  <h3 className="title-a">FORMS</h3>
                  <p className="subtitle-a">
                    Navigate to Any Form With Just One Tap
                  </p>
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
                      <p className="s-description text-center form-link">
                        <Link
                          to={formItem.link}
                          className="link-item"
                          style={{
                            display: "inline-block",
                            transition: "transform 0.3s ease-in-out",
                          }}
                          onMouseEnter={(e) =>
                            (e.target.style.transform = "scale(1.1)")
                          }
                          onMouseLeave={(e) =>
                            (e.target.style.transform = "scale(1)")
                          }
                        >
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
