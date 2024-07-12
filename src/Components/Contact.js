import Swal from 'sweetalert2';
import useFetch from "./useFetch";
import { useAuth } from '../CMSAdmin/Auth/AuthContext';

const Contact = ({ onEdit, onDelete }) => {

    const { data: contact } = useFetch("http://localhost:8000/contact");
    const { data: social } = useFetch("http://localhost:8000/social");
    const { isAuthenticated, isAdminPage } = useAuth();

    const handleDeleteClick = (contactId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                onDelete(contactId);
            }
        });
    };

    const handleDeleteLink = (linkId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                onDelete(linkId);
            }
        });
    };

    return (
        <>
            {/* ======= Contact Section ======= */}
            {contact && <section id="contact" className="paralax-mf footer-paralax bg-image sect-mt4 route" style={{ backgroundImage: 'url(../assets/img/overlay-bg.jpg)' }}>
                <div className="overlay-mf" />
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="contact-mf">
                                <div id="contact" className="box-shadow-full">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="title-box-2">
                                                <h5 className="title-left">
                                                    Send Message Us
                                                </h5>
                                            </div>
                                            <div>
                                                <form>
                                                    <div className="row">
                                                        <div className="col-md-12 mb-3">
                                                            <div className="form-group">
                                                                <input type="text" className="form-control"
                                                                 name="name" id="name" placeholder="Your Name" autoComplete="on" required />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12 mb-3">
                                                            <div className="form-group">
                                                                <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" autoComplete="on" required />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12 mb-3">
                                                            <div className="form-group">
                                                                <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" required />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <textarea className="form-control" name="message" rows={5} placeholder="Message" required defaultValue={""} />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12 text-center my-3">
                                                            {/* <div className="loading">Loading</div> */}
                                                            <div className="error-message" />
                                                            {/* <div className="sent-message">Your message has been sent. Thank you!</div> */}
                                                        </div>
                                                        <div className="col-md-12 text-center">
                                                            <button type="submit" className="button button-a button-big button-rouded">Send Message</button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            {isAuthenticated && isAdminPage && (
                                                <div className='admin-actions d-flex justify-content-end'>
                                                    {contact.map((contact) => (
                                                        <div key={contact.id}>
                                                            <button className='admin-btn' aria-label="Edit" onClick={() => onEdit(contact)}>
                                                                <i className="bi bi-pencil" />
                                                            </button>
                                                            <button className='admin-btn mx-1' aria-label="Delete" onClick={() => handleDeleteClick(contact.id)}>
                                                                <i className="bi bi-trash" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                            <div className="title-box-2 pt-4 pt-md-0">
                                                <h5 className="title-left">
                                                    Get in Touch
                                                </h5>
                                            </div>
                                            {contact && contact.map((contact) => (
                                                <div className="more-info" key={contact.id}>
                                                    <p className="lead">
                                                        {contact.description}
                                                    </p>
                                                    <ul className="list-ico">
                                                        <li><span className="bi bi-geo-alt" /> {contact.location}</li>
                                                        <li><span className="bi bi-phone" />{contact.number}</li>
                                                        <li><span className="bi bi-envelope" />{contact.email} </li>
                                                    </ul>
                                                </div>
                                            ))}

                                            <div className="socials">
                                                <ul>
                                                    {social && social.map((links) => (
                                                        <li key={links.id}>
                                                            <a href={links.link}>
                                                                <span className="ico-circle">
                                                                    <i className={links.platformIcon} />
                                                                </span>
                                                            </a>
                                                            {isAuthenticated && isAdminPage && (
                                                                <div className="admin-actions mt-3 me-2 d-flex justify-content-start">
                                                                    <button
                                                                        className="admin-btn me-1"
                                                                        aria-label="Edit"
                                                                        onClick={() => onEdit(links)}
                                                                    >
                                                                        <i className="bi bi-pencil" />
                                                                    </button>
                                                                    <button
                                                                        className="admin-btn"
                                                                        aria-label="Delete"
                                                                        onClick={() => handleDeleteLink(links.id)}
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
            </section>}
            {/* End Contact Section */}
        </>
    );
}

export default Contact;