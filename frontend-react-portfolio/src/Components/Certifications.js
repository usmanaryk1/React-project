import Swal from "sweetalert2";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { useAuth } from "../CMSAdmin/Auth/AuthContext";

const Certifications = ({
  title,
  subtitle,
  onEditClick,
  onDeleteClick,
  certifications = [],
}) => {
  const { isAuthenticated, isAdminPage } = useAuth();

  const handleDeleteClick = (certificationId) => {
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
        onDeleteClick(certificationId);
      }
    });
  };

  return (
    <>
      {/* ======= Certifications Section ======= */}
      {certifications && (
        <section id="certifications" className="route">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="title-box text-center">
                  <h3 className="title-a">{title}</h3>
                  <p className="subtitle-a">{subtitle}</p>
                  <div className="line-mf" />
                </div>
              </div>
            </div>
            <div className="row">
              {certifications.map((certification) => (
                <div
                  className="col-lg-4 col-sm-6 card-box"
                  key={certification._id}
                >
                  <div className="card card-certification">
                    {certification.image && (
                      <div className="card-img">
                        <img
                          src={certification.image}
                          loading="lazy"
                          alt="certification"
                          className="img-fluid"
                          style={{
                            maxHeight: "100%",
                            maxWidth: "100%",
                            objectFit: "contain",
                          }}
                        />
                      </div>
                    )}

                    <div className="card-body">
                      <div className="card-category-box">
                        <div className="card-category">
                          <h6 className="category">
                            {certification.cardCategory}
                          </h6>
                        </div>
                      </div>
                      {isAuthenticated && isAdminPage && (
                        <>
                          <div className="admin-actions d-flex justify-content-end">
                            <button
                              className="admin-btn btn btn-primary btn-sm"
                              aria-label="Edit"
                              onClick={() => onEditClick(certification)}
                            >
                              <i className="bi bi-pencil" />
                            </button>
                            <button
                              className="admin-btn btn btn-danger btn-sm mx-1"
                              aria-label="Delete"
                              onClick={() =>
                                handleDeleteClick(certification._id)
                              }
                            >
                              <i className="bi bi-trash" />
                            </button>
                          </div>
                        </>
                      )}
                      <Link to={`/certifications/${certification._id}`}>
                        <h3 className="card-title">
                          {certification.cardTitle}
                        </h3>
                      </Link>
                      <p className="card-description">
                        {certification.cardDescription}
                      </p>
                    </div>
                    <div className="card-footer">
                      <div className="post-author">
                        {certification.authorImage && (
                          <div>
                            <img
                              src={certification.authorImage}
                              loading="lazy"
                              alt=""
                              className="avatar rounded-circle"
                            />
                          </div>
                        )}

                        <span className="author">
                          {certification.authorName}
                        </span>
                      </div>
                      <div className="post-date">
                        <span className="bi bi-clock" />{" "}
                        {certification.postDate}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      {/*End Certifications Section */}
    </>
  );
};
export default Certifications;
