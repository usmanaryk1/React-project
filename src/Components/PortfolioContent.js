import Swal from 'sweetalert2';
import useFetch from "./useFetch";
import React, { useEffect } from 'react';
import Swiper from 'swiper/bundle';
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { useAuth } from '../CMSAdmin/Auth/AuthContext';

const PortfolioContent = ({onDelete, onEdit}) => {

    const { id } = useParams();
    const { data: details, refetch } = useFetch("http://localhost:8000/workDetails/" + id);
    const { isAuthenticated, isAdminPage } = useAuth();

    console.log("from portfolio", details);
    /**
 * Portfolio details slider
 */
    useEffect(() => {
        new Swiper('.portfolio-details-slider', {
            speed: 400,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false
            },
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true
            }
        });
    }, []);

    if (!details) {
        return <div>Loading...</div>;
    }

    const handleDeleteClick = (workId) => {
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
                onDelete(workId);
                refetch();
            }
        });
    };

    const getBasePath = () => {
        return isAdminPage ? "../../" : "../";
    };

    return (
        <>
            {details && <section id="portfolio-details" className="portfolio-details">
                <div className="container px-5">
                    <div className="row gy-4 pb-5">
                        <div className="col-lg-8">
                            <div className="portfolio-details-slider swiper">
                                <div className="swiper-wrapper align-items-center">
                                    <div className="swiper-slide" >
                                        <img src={`${getBasePath()}${details.slideImage1}`} alt="" />
                                    </div>
                                    <div className="swiper-slide">
                                        <img src={`${getBasePath()}${details.slideImage2}`} alt="" />
                                    </div>
                                    <div className="swiper-slide">
                                        <img src={`${getBasePath()}${details.slideImage3}`} alt="" />
                                    </div>
                                </div>
                                <div className="swiper-pagination" />
                            </div>
                        </div>
                        <div className="col-lg-4">
                        {isAuthenticated && isAdminPage && (
                                <>
                                    <div className='admin-actions d-flex justify-content-end mb-3'>
                                        <button className='admin-btn' aria-label="Edit" onClick={() => onEdit(details)}>
                                            <i className="bi bi-pencil" />
                                        </button>
                                        <button className='admin-btn mx-1' aria-label="Delete" onClick={() => handleDeleteClick(details.id)}>
                                            <i className="bi bi-trash" />
                                        </button>
                                    </div>
                                </>
                            )}
                            <div className="portfolio-info">
                                <h3>Project information</h3>
                                <ul>
                                    <li><strong>Category</strong> : {details.pCategory}</li>
                                    <li><strong>Client</strong> : {details.pClient}</li>
                                    <li><strong>Project date</strong> : {details.pDate}</li>
                                    <li><strong>Project URL</strong> : <a href={details.pURL}>{details.pURL}</a></li>
                                </ul>
                            </div>
                            <div className="portfolio-description">
                                <h2>This is an example of portfolio detail</h2>
                                <p>
                                    {details.desc}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>}
            {/* End Portfolio Details Section */}
        </>
    );
}

export default PortfolioContent;