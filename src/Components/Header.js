const Header = () => {
    return (
        <>
            <div>
                {/* ======= Header ======= */}
                <header id="header" className="fixed-top">
                    <div className="container d-flex align-items-center justify-content-between">
                        <h1 className="logo"><a href="index.html">Devfolio</a></h1>
                        {/* Uncomment below if you prefer to use an image logo */}
                        {/* <a href="index.html" class="logo"><img src="assets/img/logo.png" alt="" class="img-fluid"></a>*/}
                        <nav id="navbar" className="navbar">
                            <ul>
                                <li><a className="nav-link scrollto active" href="/hero">Home</a></li>
                                <li><a className="nav-link scrollto" href="/about">About</a></li>
                                <li><a className="nav-link scrollto" href="/services">Services</a></li>
                                <li><a className="nav-link scrollto " href="/work">Work</a></li>
                                <li><a className="nav-link scrollto " href="/blog">Blog</a></li>
                                <li className="dropdown"><a href="/"><span>Drop Down</span> <i className="bi bi-chevron-down" /></a>
                                    <ul>
                                        <li><a href="/">Drop Down 1</a></li>
                                        <li className="dropdown"><a href="/"><span>Deep Drop Down</span> <i className="bi bi-chevron-right" /></a>
                                            <ul>
                                                <li><a href="/">Deep Drop Down 1</a></li>
                                                <li><a href="/">Deep Drop Down 2</a></li>
                                                <li><a href="/">Deep Drop Down 3</a></li>
                                                <li><a href="/">Deep Drop Down 4</a></li>
                                                <li><a href="/">Deep Drop Down 5</a></li>
                                            </ul>
                                        </li>
                                        <li><a href="/">Drop Down 2</a></li>
                                        <li><a href="/">Drop Down 3</a></li>
                                        <li><a href="/">Drop Down 4</a></li>
                                    </ul>
                                </li>
                                <li><a className="nav-link scrollto" href="/contact">Contact</a></li>
                            </ul>
                            <i className="bi bi-list mobile-nav-toggle" />
                        </nav>{/* .navbar */}
                    </div>
                </header>{/* End Header */}
            </div>


            {/* ======= Hero Section ======= */}
            <div id="hero" className="hero route bg-image" style={{ backgroundImage: 'url(assets/img/hero-bg.jpg)' }}>
                <div className="overlay-itro" />
                <div className="hero-content display-table">
                    <div className="table-cell">
                        <div className="container">
                            {/*<p class="display-6 color-d">Hello, world!</p>*/}
                            <h1 className="hero-title mb-4">I am Morgan Freeman </h1>
                            <p className="hero-subtitle"><span className="typed" data-typed-items="Designer, Developer, Freelancer, Photographer" /></p>
                            {/* <p class="pt-3"><a class="btn btn-primary btn js-scroll px-4" href="#about" role="button">Learn More</a></p> */}
                        </div>
                    </div>
                </div>
            </div>{/* End Hero Section */}

        </>
    )
}


export default Header;