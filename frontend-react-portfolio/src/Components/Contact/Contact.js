import Swal from "sweetalert2";
import { useAuth } from "../../CMSAdmin/Auth/AuthContext";
import ContactForm from "./ContactForm";

const Contact = ({
  onEditClick,
  onDeleteClick,
  contact = [],
  links = [],
  title,
}) => {
  const { isAuthenticated, isAdminPage } = useAuth();

  const handleDelete = (id) => {
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
        onDeleteClick(id);
      }
    });
  };

  const handleDeleteClick = (contactId) => {
    handleDelete(contactId);
  };

  const handleDeleteLink = (linkId) => {
    handleDelete(linkId);
  };

  return (
    <>
      {/* ======= Contact Section ======= */}
      {contact && (
        <section
          id="contact"
          className="paralax-mf footer-paralax bg-image route"
          style={{ backgroundImage: "url(../assets/img/overlay-bg.jpg)" }}
        >
          <div className="overlay-mf" />
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="contact-mf anime-box">
                  <div id="contact" className="box-shadow-full">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="title-box-2">
                          <h5 className="title-left">Send Us Message</h5>
                        </div>
                        <div>
                          <ContactForm />
                        </div>
                      </div>
                      <div className="col-md-6">
                        {isAuthenticated && isAdminPage && (
                          <div className="admin-actions d-flex justify-content-end">
                            {contact.map((contact) => (
                              <div key={contact._id}>
                                <button
                                  className="admin-btn btn btn-primary btn-sm"
                                  aria-label="Edit"
                                  onClick={() => onEditClick(contact)}
                                >
                                  <i className="bi bi-pencil" />
                                </button>
                                <button
                                  className="admin-btn btn btn-danger btn-sm mx-1"
                                  aria-label="Delete"
                                  onClick={() => handleDeleteClick(contact._id)}
                                >
                                  <i className="bi bi-trash" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                        <div className="title-box-2 pt-4 pt-md-0">
                          <h5 className="title-left">{title}</h5>
                        </div>
                        {contact &&
                          contact.map((contact) => (
                            <div className="more-info" key={contact._id}>
                              <p className="lead">{contact.description}</p>
                              <ul className="list-ico">
                                <li>
                                  <span className="bi bi-geo-alt" />{" "}
                                  {contact.location}
                                </li>
                                <li>
                                  <span className="bi bi-phone" />
                                  {contact.number}
                                </li>
                                <li>
                                  <span className="bi bi-envelope" />
                                  {contact.email}{" "}
                                </li>
                              </ul>
                            </div>
                          ))}

                        <div className="socials">
                          <ul>
                            {links &&
                              links.map((link) => (
                                <li key={link._id}>
                                  <a href={link.link}>
                                    <span className="ico-circle">
                                      <i className={link.platformIcon} />
                                    </span>
                                  </a>
                                  {isAuthenticated && isAdminPage && (
                                    <div className="admin-actions mt-3 me-1 d-flex justify-content-start">
                                      <button
                                        className="admin-btn btn btn-primary btn-sm me-1"
                                        aria-label="Edit"
                                        onClick={() => onEditClick(link)}
                                      >
                                        <i className="bi bi-pencil" />
                                      </button>
                                      <button
                                        className="admin-btn btn btn-danger btn-sm"
                                        aria-label="Delete"
                                        onClick={() =>
                                          handleDeleteLink(link._id)
                                        }
                                      >
                                        <i className="bi bi-trash" />
                                      </button>
                                    </div>
                                  )}
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      {/* End Contact Section */}
    </>
  );
};

export default Contact;
