import useFetch from "./useFetch";
import { useAuth } from '../CMSAdmin/Auth/AuthContext';

const Contact = () => {

    const { data: contact } = useFetch("http://localhost:8000/contact");
    const { isAuthenticated, isAdminPage } = useAuth();

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
                                                                <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" autoComplete="on" required />
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
                                                <>
                                                    <div className='admin-actions d-flex justify-content-end'>
                                                        <button className='admin-btn' aria-label="Edit"><i className="bi bi-pencil" /></button>
                                                        <button className='admin-btn mx-1' aria-label="Delete"><i className="bi bi-trash" /></button>
                                                    </div>
                                                </>
                                            )}
                                            <div className="title-box-2 pt-4 pt-md-0">
                                                <h5 className="title-left">
                                                    Get in Touch
                                                </h5>
                                            </div>
                                            {contact.map((contact) => (
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
                                                    <li><a href={contact.facebook}><span className="ico-circle"><i className="bi bi-facebook" /></span></a></li>
                                                    <li><a href={contact.instagram}><span className="ico-circle"><i className="bi bi-instagram" /></span></a></li>
                                                    <li><a href={contact.twitter}><span className="ico-circle"><i className="bi bi-twitter" /></span></a></li>
                                                    <li><a href={contact.linkedIn}><span className="ico-circle"><i className="bi bi-linkedin" /></span></a></li>
                                                    <li><a href={contact.whatsapp}><span className="ico-circle"><i className="bi bi-whatsapp" /></span></a></li>
                                                    <li><a href={contact.github}><span className="ico-circle"><i className="bi bi-github" /></span></a></li>
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