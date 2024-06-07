import { Link } from "react-router-dom/cjs/react-router-dom";
// import BlogDetails from "./BlogDetails";

const Blog = ({ title, subtitle, blogs }) => {
    
    return (
        <>
            {/* ======= Blog Section ======= */}
            <section id="blog" className="blog-mf sect-pt4 route">
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
                        {blogs.map((blog) => (
                            <div className="col-md-4" key={blog.id}>
                                <Link to={`/blogs/${blog.id}`}>
                                    <div className="card card-blog">
                                        <div className="card-img">
                                            <a href="/" ><img src={blog.image} alt="" className="img-fluid" /></a>
                                        </div>
                                        <div className="card-body">
                                            <div className="card-category-box">
                                                <div className="card-category">
                                                    <h6 className="category">{blog.cardCategory}</h6>
                                                </div>
                                            </div>
                                            <h3 className="card-title"><a href="blog-single.html">{blog.cardTitle}</a></h3>
                                            <p className="card-description">{blog.cardDescription}</p>
                                        </div>
                                        <div className="card-footer">
                                            <div className="post-author">
                                                <a href="/">
                                                    <img src={blog.authorImage} alt="" className="avatar rounded-circle" />
                                                    <span className="author">{blog.authorName}</span>
                                                </a>
                                            </div>
                                            <div className="post-date">
                                                <span className="bi bi-clock" /> {blog.postDate}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section >  {/*End Blog Section */} 
        </>
    );
}
export default Blog;