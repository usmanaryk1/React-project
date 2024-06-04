const Hero = () => {
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