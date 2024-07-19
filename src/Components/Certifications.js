import Swal from 'sweetalert2';
import { Link } from "react-router-dom/cjs/react-router-dom";
import { useAuth } from '../CMSAdmin/Auth/AuthContext';

const Certifications = ({ title, subtitle, onEditClick, onDeleteClick, certifications=[] }) => {

    const { isAuthenticated, isAdminPage } = useAuth();

    const handleDeleteClick = (certificationId) => {
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
                onDeleteClick(certificationId);
            }
        });
    };

    return (
        <>
            {/* ======= Certifications Section ======= */}
            {certifications && <section id="certifications" className="blog-mf sect-pt4 route">
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
                            <div className="col-md-4 card-box" key={certification.id}>

                                <div className="card card-certification">
                                    <div className="card-img">
                                        <img src={certification.image} alt="" className="img-fluid" />
                                    </div>
                                    <div className="card-body">
                                        <div className="card-category-box">
                                            <div className="card-category">
                                                <h6 className="category">{certification.cardCategory}</h6>
                                            </div>
                                        </div>
                                        {isAuthenticated && isAdminPage && (
                                            <>
                                                <div className='admin-actions d-flex justify-content-end'>
                                                    <button className='admin-btn' aria-label="Edit" onClick={() => onEditClick(certification)}>
                                                        <i className="bi bi-pencil" />
                                                    </button>
                                                    <button className='admin-btn mx-1' aria-label="Delete" onClick={() => handleDeleteClick(certification.id)}>
                                                        <i className="bi bi-trash" />
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                        <Link to={`/certifications/${certification.id}`}>
                                            <h3 className="card-title"><a href="blog-single.html">{certification.cardTitle}</a></h3>
                                        </Link>
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
                            </div>
                        ))}
                    </div>
                </div>
            </section >}
            {/*End Certifications Section */}
        </>
    );
}
export default Certifications;