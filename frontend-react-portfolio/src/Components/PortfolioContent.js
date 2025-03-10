import Swal from "sweetalert2";
import React, { useEffect } from "react";
import Swiper from "swiper/bundle";
import { useAuth } from "../CMSAdmin/Auth/AuthContext";

const PortfolioContent = ({ onDeleteClick, onEditClick, details, workId }) => {
  const { isAuthenticated, isAdminPage } = useAuth();
  // console.log(" portfolio details", details);

  /**
   * Portfolio details slider
   */

  useEffect(() => {
    const swiper = new Swiper(".portfolio-details-slider", {
      speed: 400,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
        clickable: true,
      },
    });
    return () => swiper.destroy(); // Clean up Swiper instance on component unmount
  }, [details?.slideImages]);

  if (!details) {
    return <div>Loading...</div>;
  }

  // console.log("workId in portfolio Content:", workId);

  const handleDeleteClick = (detailsId) => {
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
        onDeleteClick(detailsId, workId);
      }
    });
  };

  return (
    <>
      {details && (
        <section id="portfolio-details" className="portfolio-details">
          <div className="container px-5">
            <div className="row gy-4 pb-5">
              {isAuthenticated && isAdminPage && (
                <>
                  <div className="admin-actions d-flex justify-content-end mb-3">
                    <button
                      className="admin-btn btn btn-primary"
                      aria-label="Edit"
                      onClick={() => onEditClick(details)}
                    >
                      <i className="bi bi-pencil" />
                    </button>
                    <button
                      className="admin-btn mx-1 btn btn-danger"
                      aria-label="Delete"
                      onClick={() => handleDeleteClick(details._id)}
                    >
                      <i className="bi bi-trash" />
                    </button>
                  </div>
                </>
              )}
              {details.slideImages && (
                <div className="col-lg-8">
                  <div className="portfolio-details-slider swiper">
                    <div className="swiper-wrapper align-items-center">
                      {details.slideImages.map((image, index) => (
                        <div className="swiper-slide" key={index}>
                          <img
                            src={image}
                            loading="lazy"
                            alt={`Slide`}
                            style={{
                              maxHeight: "100%",
                              maxWidth: "100%",
                              objectFit: "contain",
                            }}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="swiper-pagination" />
                  </div>
                </div>
              )}

              <div
                className={
                  details.slideImages?.length > 0
                    ? "col-lg-4"
                    : "col-lg-12 mx-auto d-md-flex"
                }
              >
                <div
                  className={details.slideImages?.length > 0 ? " " : "col-lg-6"}
                >
                  <div className="portfolio-info">
                    <h3>Project Information</h3>
                    <ul>
                      <li>
                        <strong>Category</strong> : {details.pCategory}
                      </li>
                      <li>
                        <strong>Client</strong> : {details.pClient}
                      </li>
                      <li>
                        <strong>Project date</strong> : {details.pDate}
                      </li>
                      <li>
                        <strong>Project URL</strong> :{" "}
                        <a href={details.pURL} target="blank">
                          {details.pURL}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div
                  className={
                    details.slideImages?.length > 0
                      ? "mt-3"
                      : "col-lg-6 ms-2 mt-3 mt-md-0"
                  }
                >
                  <div className="portfolio-description">
                    <h2>Project Description</h2>
                    <p>{details.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      {/* End Portfolio Details Section */}
    </>
  );
};

export default PortfolioContent;
