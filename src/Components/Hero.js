import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';

const Hero = () => {

    /**
* Intro type effect
*/
    const typedRef = useRef(null);
    useEffect(() => {
        const typedElement = document.querySelector('.typed');
        if (typedElement) {
            let typed_strings = typedElement.getAttribute('data-typed-items');
            typed_strings = typed_strings.split(',');
            // Initialize Typed.js and store the instance in the ref
            typedRef.current = new Typed('.typed', {
                strings: typed_strings,
                loop: true,
                typeSpeed: 100,
                backSpeed: 50,
                backDelay: 2000
            });
        }
        // Cleanup function to destroy the Typed instance
        return () => {
            if (typedRef.current) {
                typedRef.current.destroy();
            }
        };
    }, []);

    return (
        <>
            {/* ======= Hero Section ======= */}
            <div id="hero" className="hero route bg-image" style={{ backgroundImage: 'url(assets/img/hero-bg.jpg)' }}>
                <div className="overlay-itro" />
                <div className="hero-content display-table">
                    <div className="table-cell">
                        <div className="container">
                            {/*<p class="display-6 color-d">Hello, world!</p>*/}
                            <h1 className="hero-title mb-4">I am Morgan Freeman</h1>
                            <p className="hero-subtitle"><span className="typed" data-typed-items="Designer, Developer, Freelancer, Photographer" /></p>
                            {/* <p class="pt-3"><a class="btn btn-primary btn js-scroll px-4" href="#about" role="button">Learn More</a></p> */}
                        </div>
                    </div>
                </div>
            </div>{/* End Hero Section */}
        </>
    );
}

export default Hero;