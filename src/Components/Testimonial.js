import Swal from 'sweetalert2';
import React, { useEffect } from 'react';
import Swiper from 'swiper/bundle';
import useFetch from './useFetch';
import { useAuth } from '../CMSAdmin/Auth/AuthContext';

const Testimonial = ({onEdit, onDelete}) => {

    const { data: testimonials } = useFetch("http://localhost:8000/testimonials");
    const { isAuthenticated, isAdminPage } = useAuth();
    
    /**
     * Testimonials slider
     */
    useEffect(() => {
        if (testimonials) {
            new Swiper('.testimonials-slider', {
                speed: 600,
                loop: true,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false
                },
                slidesPerView: 'auto',
                pagination: {
                    el: '.swiper-pagination',
                    type: 'bullets',
                    clickable: true
                }
            });
        }
    }, [testimonials]);

    const handleDeleteClick = (serviceId) => {
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
                onDelete(serviceId);
            }
        });
    };

    return (
        <>
            {/* ======= Testimonials Section ======= */}
            {testimonials && <div className="testimonials paralax-mf bg-image" style={{ backgroundImage: 'url(../assets/img/overlay-bg.jpg)' }}>
                <div className="overlay-mf" />
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="testimonials-slider swiper" data-aos="fade-up" data-aos-delay={100}>
                                <div className="swiper-wrapper">
                                    {testimonials.map((testimonial) => (
                                        <div className="swiper-slide" key={testimonial.id} >
                                            <div className="testimonial-box">
                                                {isAuthenticated && isAdminPage && (
                                                    <div className='admin-actions d-flex justify-content-end'>
                                                        <button className='admin-btn' aria-label="Edit" onClick={() => onEdit(testimonial)}>
                                                            <i className="bi bi-pencil" />
                                                        </button>
                                                        <button className='admin-btn mx-1' aria-label="Delete" onClick={() => handleDeleteClick(testimonial.id)}>
                                                            <i className="bi bi-trash" />
                                                        </button>
                                                    </div>
                                                )}
                                                <div className="author-test">
                                                    <img src={testimonial.img} alt="" className="rounded-circle b-shadow-a" />
                                                    <span className="author"> {testimonial.name} </span>
                                                </div>
                                                <div className="content-test">
                                                    <p className="description lead">{testimonial.description} </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="swiper-pagination" />
                            </div>
                            {/* <div id="testimonial-mf" class="owl-carousel owl-theme"></div> */}
                        </div>
                    </div>
                </div>
            </div>}
            {/* End Testimonials Section */}
        </>
    );
}

export default Testimonial;