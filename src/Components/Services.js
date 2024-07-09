import useFetch from "./useFetch";
import { useAuth } from '../CMSAdmin/Auth/AuthContext';

const Services = ({ title, subtitle }) => {

    const { data: services } = useFetch("http://localhost:8000/services");
    const { isAuthenticated, isAdminPage } = useAuth();

    return (
        <>
            {/* ======= Services Section ======= */}
            {services && <section id="services" className="services-mf pt-5 route">
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
                            <div className="col-md-4" key={service.id}  >
                                <div className="service-box">
                                    {isAuthenticated && isAdminPage && (
                                        <div className='admin-actions d-flex justify-content-end align-items-start'>
                                            <button className='admin-btn' aria-label="Edit"><i className="bi bi-pencil" /></button>
                                            <button className='admin-btn mx-1' aria-label="Delete"><i className="bi bi-trash" /></button>
                                        </div>
                                    )}
                                    <div className="service-ico">
                                        <span className="ico-circle"><i className={service.sIcon} /></span>
                                    </div>
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
            </section>}
            {/* End Services Section */}
        </>
    );
}

export default Services;