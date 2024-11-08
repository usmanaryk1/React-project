import Swal from "sweetalert2";
import { useAuth } from "../CMSAdmin/Auth/AuthContext";
import Skills from "./Skills/Skills";

const About = ({
  onEditClick,
  onDeleteClick,
  about = [],
  skills = [],
  handleEditClick,
  handleDelete,
}) => {
  const { isAuthenticated, isAdminPage } = useAuth();
  // console.log("about content:", about);

  const handleDeleteClick = (aboutId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#3085d6",
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        onDeleteClick(aboutId);
      }
    });
  };

  return (
    <>
      {/* ======= About Section Start======= */}
      {Array.isArray(about) && about.length > 0 && (
        <section id="about" className="about-mf sect-pt4 route">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                {about.map((about) => (
                  <div className="box-shadow-full" key={about._id}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="row">
                          {about.img && (
                            <div className="col-sm-6 col-md-5">
                              <div className="about-img">
                                <img
                                  src={about.img}
                                  className="img-fluid rounded b-shadow-a"
                                  alt=""
                                />
                              </div>
                            </div>
                          )}

                          <div className="col-sm-6 col-md-7">
                            <div className="about-info">
                              <p>
                                <span className="title-s">Name: </span>{" "}
                                <span> {about.name} </span>
                              </p>
                              <p>
                                <span className="title-s">Profile: </span>{" "}
                                <span> {about.profile} </span>
                              </p>
                              <p>
                                <span className="title-s">Email: </span>{" "}
                                <span> {about.email} </span>
                              </p>
                              <p>
                                <span className="title-s">Phone: </span>{" "}
                                <span> {about.phone} </span>
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="skill-mf">
                          {skills && skills.length > 0 && (
                            <>
                              <p className="title-s">Skills</p>
                              <Skills
                                skills={skills}
                                handleDelete={handleDelete}
                                handleEditClick={handleEditClick}
                              />

                              {/* <span>HTML</span>{" "}
                            <span className="pull-right">100%</span>
                            <div className="progress">
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: "100%" }}
                                aria-valuenow={100}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                            <span>CSS3</span>{" "}
                            <span className="pull-right">95%</span>
                            <div className="progress">
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: "95%" }}
                                aria-valuenow={95}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                            <span>JAVASCRIPT</span>{" "}
                            <span className="pull-right">90%</span>
                            <div className="progress">
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: "90%" }}
                                aria-valuenow={90}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                            <span>REACT</span>{" "}
                            <span className="pull-right">85%</span>
                            <div className="progress">
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: "85%" }}
                                aria-valuenow={85}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                              </div>  */}
                            </>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="about-me pt-4 pt-md-0">
                          <div className="title-box-2 d-flex justify-content-between">
                            <h5 className="title-left">About</h5>
                            {isAuthenticated && isAdminPage && (
                              <div className="admin-actions">
                                <button
                                  className="admin-btn btn btn-primary btn-sm me-1"
                                  aria-label="Edit"
                                  onClick={() => onEditClick(about)}
                                >
                                  <i className="bi bi-pencil" />
                                </button>
                                <button
                                  className="admin-btn btn btn-danger btn-sm"
                                  aria-label="Delete"
                                  onClick={() => handleDeleteClick(about._id)}
                                >
                                  <i className="bi bi-trash" />
                                </button>
                              </div>
                            )}
                          </div>
                          <p className="lead">{about.desc}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
      {/* End About Section */}
    </>
  );
};

export default About;
