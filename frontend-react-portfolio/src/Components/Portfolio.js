import Swal from "sweetalert2";
import { useAuth } from "../CMSAdmin/Auth/AuthContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const Portfolio = ({ title, subtitle, onEdit, onDelete, works = [] }) => {
  const { isAuthenticated, isAdminPage } = useAuth();
  const history = useHistory();

  const handleDeleteClick = (serviceId) => {
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
        onDelete(serviceId);
      }
    });
  };

  const handleClickLink = (work) => {
    const queryParams = new URLSearchParams({
      workDetailsId: work.workDetailsId,
    }).toString();
    if (isAuthenticated) {
      if (isAdminPage) {
        history.push(`/form/portfolioDetails-form/${work._id}?${queryParams}`);
      } else {
        history.push(`/works/${work._id}?${queryParams}`);
      }
    } else {
      history.push(`/works/${work._id}?${queryParams}`);
    }
  };

  return (
    <>
      {/* ======= Portfolio Section ======= */}
      {works && (
        <section id="work" className="portfolio-mf sect-pt4 route">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="title-box text-center">
                  <h3 className="title-a">{title}</h3>
                  <p className="subtitle-a">{subtitle} </p>
                  <div className="line-mf" />
                </div>
              </div>
            </div>
            <div className="row">
              {works.map((work) => (
                <div className="col-md-4" key={work._id}>
                  <div className="work-box">
                    {/* <a href={work.linkImage} data-gallery="portfolioGallery" className="portfolio-lightbox"> */}
                    {work.workImage && (
                      <div className="work-img">
                        <img
                          src={work.workImage}
                          alt=""
                          className="img-fluid"
                        />
                      </div>
                    )}

                    {/* </a> */}
                    {isAuthenticated && isAdminPage && (
                      <div className="admin-actions d-flex align-items-start justify-content-end mt-2 mb-0">
                        <button
                          className="admin-btn btn btn-primary btn-sm me-1"
                          aria-label="Edit"
                          onClick={() => onEdit(work)}
                        >
                          <i className="bi bi-pencil" />
                        </button>
                        <button
                          className="admin-btn btn btn-danger btn-sm"
                          aria-label="Delete"
                          onClick={() => handleDeleteClick(work._id)}
                        >
                          <i className="bi bi-trash" />
                        </button>
                      </div>
                    )}
                    <div className="work-content">
                      <div className="row">
                        <div className="col-sm-8">
                          <h2 className="w-title">
                            <a href={work.pURL} target="blank">
                              {work.wTitle}
                            </a>
                          </h2>
                          <div className="w-more">
                            <span className="w-ctegory">{work.wCategory}</span>{" "}
                            / <span className="w-date">{work.wDate}</span>
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div
                            className="w-like"
                            onClick={() => {
                              handleClickLink(work);
                            }}
                          >
                            <span className="bi bi-plus-circle" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      {/* End Portfolio Section */}
    </>
  );
};

export default Portfolio;
