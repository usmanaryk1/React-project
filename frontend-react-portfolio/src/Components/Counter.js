import Swal from "sweetalert2";
import React, { useEffect } from "react";
import PureCounter from "@srexi/purecounterjs";
import { useAuth } from "../CMSAdmin/Auth/AuthContext";

const Counter = ({ onEdit, onDelete, counts = [] }) => {
  const { isAuthenticated, isAdminPage } = useAuth();
  /**
   * Initiate Pure Counter
   */
  useEffect(() => {
    if (counts) {
      new PureCounter();
    }
  }, [counts]);

  const handleDeleteClick = (counterId) => {
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
        onDelete(counterId);
      }
    });
  };

  return (
    <>
      {/* ======= Counter Section ======= */}
      {counts && (
        <div
          className="section-counter paralax-mf bg-image"
          style={{ backgroundImage: "url(../assets/img/counters-bg.jpg)" }}
        >
          <div className="overlay-mf" />
          <div className="container position-relative">
            <div className="row">
              {counts.map((counter) => (
                <div className="col-sm-3 col-lg-3" key={counter._id}>
                  <div className="counter-box counter-box pt-4 ">
                    {counter.icon && (
                      <div className="counter-ico">
                        <span className="ico-circle">
                          <i className={counter.icon} />
                        </span>
                      </div>
                    )}

                    <div className="counter-num">
                      <p
                        data-purecounter-start={0}
                        data-purecounter-end={counter.counterEnd}
                        data-purecounter-duration={1}
                        className="counter purecounter"
                      />
                      <span className="counter-text text-uppercase">
                        {" "}
                        {counter.text}{" "}
                      </span>
                    </div>
                    {isAuthenticated && isAdminPage && (
                      <div className="admin-actions mb-3">
                        <button
                          className="admin-btn btn btn-primary btn-sm"
                          aria-label="Edit"
                          onClick={() => onEdit(counter)}
                        >
                          <i className="bi bi-pencil" />
                        </button>
                        <button
                          className="admin-btn btn btn-danger btn-sm mx-1"
                          aria-label="Delete"
                          onClick={() => handleDeleteClick(counter._id)}
                        >
                          <i className="bi bi-trash" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* End Counter Section */}
    </>
  );
};

export default Counter;
