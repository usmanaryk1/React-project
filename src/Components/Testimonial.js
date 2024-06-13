import React, { useEffect } from 'react';
import Swiper from 'swiper/bundle';

const Testimonial = ({ testimonials }) => {

    /**
     * Testimonials slider
     */
    useEffect(() => {
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
    }, []);

    return (
        <>
            {/* ======= Testimonials Section ======= */}
            <div className="testimonials paralax-mf bg-image" style={{ backgroundImage: 'url(assets/img/overlay-bg.jpg)' }}>
                <div className="overlay-mf" />
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="testimonials-slider swiper" data-aos="fade-up" data-aos-delay={100}>
                                <div className="swiper-wrapper">
                                    {testimonials.map((testimonial) => (
                                        <div className="swiper-slide" key={testimonial.id} >
                                            <div className="testimonial-box">
                                                <div className="author-test">
                                                    <img src={testimonial.authorImg} alt="" className="rounded-circle b-shadow-a" />
                                                    <span className="author"> {testimonial.authorName} </span>
                                                </div>
                                                <div className="content-test">
                                                    <p className="description lead">{testimonial.authorDescription} </p>
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
            </div>{/* End Testimonials Section */}
        </>
    );
}

export default Testimonial;