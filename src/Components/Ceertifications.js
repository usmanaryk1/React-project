import { Link } from "react-router-dom/cjs/react-router-dom";

const Certifications = ({ title, subtitle, certifications }) => {
    
    return (
        <>
            {/* ======= Certifications Section ======= */}
            <section id="certifications" className="blog-mf sect-pt4 route">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="title-box text-center">
                                <h3 className="title-a">{title}</h3>
                                <p className="subtitle-a">{subtitle}</p>
                                <div className="line-mf" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {certifications.map((certification) => (
                            <div className="col-md-4" key={certification.id}>
                                <Link to={`/certifications/${certification.id}`}>
                                    <div className="card card-blog">
                                        <div className="card-img">
                                            <a href="/" ><img src={certification.image} alt="" className="img-fluid" /></a>
                                        </div>
                                        <div className="card-body">
                                            <div className="card-category-box">
                                                <div className="card-category">
                                                    <h6 className="category">{certification.cardCategory}</h6>
                                                </div>
                                            </div>
                                            <h3 className="card-title"><a href="blog-single.html">{certification.cardTitle}</a></h3>
                                            <p className="card-description">{certification.cardDescription}</p>
                                        </div>
                                        <div className="card-footer">
                                            <div className="post-author">
                                                <a href="/">
                                                    <img src={certification.authorImage} alt="" className="avatar rounded-circle" />
                                                    <span className="author">{certification.authorName}</span>
                                                </a>
                                            </div>
                                            <div className="post-date">
                                                <span className="bi bi-clock" /> {certification.postDate}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section >  {/*End Certifications Section */} 
        </>
    );
}
export default Certifications;