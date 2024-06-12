import React, { useEffect } from 'react';
import PureCounter from '@srexi/purecounterjs';

const Counter = ({ counts }) => {

    /**
 * Initiate Pure Counter 
 */
    useEffect(() => {
        new PureCounter();
    }, []);


    return (
        <>
            {/* ======= Counter Section ======= */}
            <div className="section-counter paralax-mf bg-image" style={{ backgroundImage: 'url(assets/img/counters-bg.jpg)' }}>
                <div className="overlay-mf" />
                <div className="container position-relative">
                    <div className="row">
                        {counts.map((counter) => (
                            <div className="col-sm-3 col-lg-3" key={counter.id} >
                                <div className="counter-box counter-box pt-4 pt-md-0">
                                    <div className="counter-ico">
                                        <span className="ico-circle"><i className={counter.counterIcon} /></span>
                                    </div>
                                    <div className="counter-num">
                                        <p data-purecounter-start={0} data-purecounter-end={counter.counterEnd} data-purecounter-duration={1} className="counter purecounter" />
                                        <span className="counter-text"> {counter.counterText} </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>{/* End Counter Section */}
        </>

    );
}

export default Counter;