import { Link } from "react-router-dom/cjs/react-router-dom";
import useFetch from "./useFetch";

const Portfolio = ({ title, subtitle }) => {

    const { data: works } = useFetch("http://localhost:8000/works");

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
                                    <div className="work-content">
                                        <div className="row">
                                            <div className="col-sm-8">
                                                <h2 className="w-title">{work.wTitle}</h2>
                                                <div className="w-more">
                                                    <span className="w-ctegory">{work.wCategory}</span> / <span className="w-date">{work.wDate}</span>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <Link to={`/works/${work.id}`}>
                                                    <div className="w-like">
                                                        <a href="portfolio-details.html"> <span className="bi bi-plus-circle" /></a>
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