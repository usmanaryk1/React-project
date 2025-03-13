import Swal from "sweetalert2";
import { useAuth } from "../CMSAdmin/Auth/AuthContext";

const Services = ({ title, subtitle, onEdit, onDelete, services = [] }) => {
  const { isAuthenticated, isAdminPage } = useAuth();
  // console.log("service content: ", services);

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

  return (
    <>
      {/* ======= Services Section ======= */}
      {services && (
        <section id="services" className="services-mf route">
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
              {services.map((service) => (
                <div className="col-md-4" key={service._id}>
                  <div className="service-box">
                    {isAuthenticated && isAdminPage && (
                      <div className="admin-actions d-flex justify-content-end align-items-start">
                        <button
                          className="admin-btn btn btn-primary btn-sm"
                          aria-label="Edit"
                          onClick={() => onEdit(service)}
                        >
                          <i className="bi bi-pencil" />
                        </button>
                        <button
                          className="admin-btn btn btn-danger btn-sm mx-1"
                          aria-label="Delete"
                          onClick={() => handleDeleteClick(service._id)}
                        >
                          <i className="bi bi-trash" />
                        </button>
                      </div>
                    )}
                    {service.sIcon && (
                      <div className="service-ico">
                        <span className="ico-circle">
                          <i className={service.sIcon} />
                        </span>
                      </div>
                    )}

                    <div className="service-content">
                      <h2 className="s-title">{service.sTitle}</h2>
                      <p className="s-description text-center">
                        {service.sDescription}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      {/* End Services Section */}
    </>
  );
};

export default Services;
