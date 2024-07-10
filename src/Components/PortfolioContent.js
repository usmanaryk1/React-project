import useFetch from "./useFetch";
import React, { useEffect } from 'react';
import Swiper from 'swiper/bundle';
import { useParams } from "react-router-dom/cjs/react-router-dom";

const PortfolioContent = () => {

    const { id } = useParams();
    const { data: work } = useFetch("http://localhost:8000/workDetails/" + id);
    console.log("from portfolio", work);
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

    if (!work) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {work && <section id="portfolio-details" className="portfolio-details">
                <div className="container px-5">
                    <div className="row gy-4 pb-5">
                        <div className="col-lg-8">
                            <div className="portfolio-details-slider swiper">
                                <div className="swiper-wrapper align-items-center">
                                    <div className="swiper-slide" >
                                        <img src={work.slideImage1} alt="" />
                                    </div>
                                    <div className="swiper-slide">
                                        <img src={work.slideImage2} alt="" />
                                    </div>
                                    <div className="swiper-slide">
                                        <img src={work.slideImage3} alt="" />
                                    </div>
                                </div>
                                <div className="swiper-pagination" />
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="portfolio-info">
                                <h3>Project information</h3>
                                <ul>
                                    <li><strong>Category</strong> : {work.pCategory}</li>
                                    <li><strong>Client</strong> : {work.pClient}</li>
                                    <li><strong>Project date</strong> : {work.pDate}</li>
                                    <li><strong>Project URL</strong> : <a href={work.pURL}>{work.pURL}</a></li>
                                </ul>
                            </div>
                            <div className="portfolio-description">
                                <h2>This is an example of portfolio detail</h2>
                                <p>
                                    {work.desc}
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