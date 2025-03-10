import Swal from "sweetalert2";
import React, { useEffect } from "react";
import Swiper from "swiper/bundle";
import { useAuth } from "../CMSAdmin/Auth/AuthContext";

const Testimonial = ({ onEditClick, onDeleteClick, testimonials = [] }) => {
  const { isAuthenticated, isAdminPage } = useAuth();

  /**
   * Testimonials slider
   */
  useEffect(() => {
    if (testimonials) {
      new Swiper(".testimonials-slider", {
        speed: 600,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        slidesPerView: "auto",
        pagination: {
          el: ".swiper-pagination",
          type: "bullets",
          clickable: true,
        },
      });
    }
  }, [testimonials]);

  const handleDeleteClick = (testimonialId) => {
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
        onDeleteClick(testimonialId);
      }
    });
  };

  return (
    <>
      {/* ======= Testimonials Section ======= */}
      {testimonials && (
        <div
          className="testimonials paralax-mf bg-image"
          style={{ backgroundImage: "url(../assets/img/overlay-bg.jpg)" }}
        >
          <div className="overlay-mf" />
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div
                  className="testimonials-slider swiper"
                  data-aos="fade-up"
                  data-aos-delay={100}
                >
                  <div className="swiper-wrapper">
                    {testimonials.map((testimonial) => (
                      <div className="swiper-slide" key={testimonial._id}>
                        <div className="testimonial-box">
                          {isAuthenticated && isAdminPage && (
                            <div className="admin-actions d-flex justify-content-end">
                              <button
                                className="admin-btn btn btn-primary btn-sm"
                                aria-label="Edit"
                                onClick={() => onEditClick(testimonial)}
                              >
                                <i className="bi bi-pencil" />
                              </button>
                              <button
                                className="admin-btn btn btn-danger btn-sm mx-1"
                                aria-label="Delete"
                                onClick={() =>
                                  handleDeleteClick(testimonial._id)
                                }
                              >
                                <i className="bi bi-trash" />
                              </button>
                            </div>
                          )}
                          <div className="author-test">
                            {testimonial.img && (
                              <div>
                                <img
                                  src={testimonial.img}
                                  loading="lazy"
                                  alt=""
                                  className="rounded-circle b-shadow-a author-img"
                                />
                              </div>
                            )}

                            <span className="author"> {testimonial.name} </span>
                          </div>
                          <div className="content-test">
                            <p className="description lead">
                              {testimonial.description}{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="swiper-pagination" />
                </div>
                {/* <div id="testimonial-mf" class="owl-carousel owl-theme"></div> */}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* End Testimonials Section */}
    </>
  );
};

export default Testimonial;
