import { Link } from "react-router-dom/cjs/react-router-dom";
import useFetch from "./useFetch";
import { useAuth } from '../CMSAdmin/Auth/AuthContext';

const Portfolio = ({ title, subtitle }) => {

    const { data: works } = useFetch("http://localhost:8000/works");
    const { isAuthenticated, isAdminPage } = useAuth();

    return (
        <>
            {/* ======= Portfolio Section ======= */}
            {works && <section id="work" className="portfolio-mf sect-pt4 route">
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
                            <div className="col-md-4" key={work.id}>
                                <div className="work-box">
                                    <a href={work.linkImage} data-gallery="portfolioGallery" className="portfolio-lightbox">
                                        <div className="work-img">
                                            <img src={work.workImage} alt="" className="img-fluid" />
                                        </div>
                                    </a>
                                    {isAuthenticated && isAdminPage && (
                                        <div className='admin-actions d-flex align-items-start justify-content-end mt-2 mb-0'>
                                            <button className='admin-btn me-1' aria-label="Edit"><i className="bi bi-pencil" /></button>
                                            <button className='admin-btn' aria-label="Delete"><i className="bi bi-trash" /></button>
                                        </div>
                                    )}
                                    <div className="work-content">

                                        <div className="row">
                                            <div className="col-sm-8">
                                                <h2 className="w-title"><a href={work.pURL}>{work.wTitle}</a></h2>
                                                <div className="w-more">
                                                    <span className="w-ctegory">{work.wCategory}</span> / <span className="w-date">{work.wDate}</span>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <Link to={`/works/${work.id}`}>
                                                    <div className="w-like">
                                                        <a href="/"> <span className="bi bi-plus-circle" /></a>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>}
            {/* End Portfolio Section */}
        </>
    );
}

export default Portfolio;