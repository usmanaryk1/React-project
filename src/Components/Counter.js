import React, { useEffect } from 'react';
import PureCounter from '@srexi/purecounterjs';
import useFetch from './useFetch';

const Counter = () => {

    const { data: counts } = useFetch("http://localhost:8000/counts");

    /**
 * Initiate Pure Counter 
 */
    useEffect(() => {
        if (counts) {
            new PureCounter();
        }
    }, [counts]);


    return (
        <>
            {/* ======= Counter Section ======= */}
            {counts && <div className="section-counter paralax-mf bg-image" style={{ backgroundImage: 'url(../assets/img/counters-bg.jpg)' }}>
                <div className="overlay-mf" />
                <div className="container position-relative">
                    <div className="row">
                        {counts.map((counter) => (
                            <div className="col-sm-3 col-lg-3" key={counter.id} >
                                <div className="counter-box counter-box pt-4 pt-md-0">
                                    <div className="counter-ico">
                                        <span className="ico-circle"><i className={counter.icon} /></span>
                                    </div>
                                    <div className="counter-num">
                                        <p data-purecounter-start={0} data-purecounter-end={counter.counterEnd} data-purecounter-duration={1} className="counter purecounter" />
                                        <span className="counter-text text-uppercase"> {counter.text} </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>}
            {/* End Counter Section */}
        </>

    );
}

export default Counter;