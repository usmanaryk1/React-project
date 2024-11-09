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
  handleReorder,
}) => {
  const { isAuthenticated, isAdminPage } = useAuth();

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
      {/* About Section */}
      {about && (
        <section id="about" className="about-mf sect-pt4 route">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="box-shadow-full">
                  <div className="row">
                    <div className="col-md-6">
                      {about.map((item) => (
                        <div className="row" key={item._id}>
                          {item.img && (
                            <div className="col-sm-6 col-md-5">
                              <div className="about-img">
                                <img
                                  src={item.img}
                                  className="img-fluid rounded b-shadow-a"
                                  alt="Profile"
                                />
                              </div>
                            </div>
                          )}
                          <div className="col-sm-6 col-md-7">
                            <div className="about-info">
                              <p>
                                <span className="title-s">Name: </span>{" "}
                                {item.name}
                              </p>
                              <p>
                                <span className="title-s">Profile: </span>{" "}
                                {item.profile}
                              </p>
                              <p>
                                <span className="title-s">Email: </span>{" "}
                                {item.email}
                              </p>
                              <p>
                                <span className="title-s">Phone: </span>{" "}
                                {item.phone}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="skill-mf">
                        {skills && skills.length > 0 && (
                          <div>
                            <p className="title-s">Skills</p>
                            <Skills
                              skills={skills}
                              handleDelete={handleDelete}
                              handleEditClick={handleEditClick}
                              handleReorder={handleReorder}
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {about.map((item) => (
                      <div className="col-md-6" key={item._id}>
                        <div className="about-me pt-4 pt-md-0">
                          <div className="title-box-2 d-flex justify-content-between">
                            <h5 className="title-left">About</h5>
                            {isAuthenticated && isAdminPage && (
                              <div className="admin-actions">
                                <button
                                  className="admin-btn btn btn-primary btn-sm me-1"
                                  onClick={() => onEditClick(item)}
                                >
                                  <i className="bi bi-pencil" />
                                </button>
                                <button
                                  className="admin-btn btn btn-danger btn-sm"
                                  onClick={() => handleDeleteClick(item._id)}
                                >
                                  <i className="bi bi-trash" />
                                </button>
                              </div>
                            )}
                          </div>
                          <p className="lead">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default About;
