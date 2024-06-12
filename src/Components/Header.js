// import { useEffect } from "react";
// import { Link } from "react-router-dom/cjs/react-router-dom";

const Header = () => {

    return (
        <>
            {/* ======= Header ======= */}
            <header id="header" className="fixed-top">
                <div className="container d-flex align-items-center justify-content-between">
                    <h1 className="logo"><a href="index.html">DevFolio</a></h1>
                    {/* Uncomment below if you prefer to use an image logo */}
                    <nav id="navbar" className="navbar">
                        {/* <a href="index.html" class="logo"><img src="assets/img/logo/png" alt="" class="img-fluid"/></a> */}
                        <ul>
                            <li><a className="nav-link scrollto active" href="#hero">Home</a></li>
                            <li><a className="nav-link scrollto" href="#about">About</a></li>
                            <li><a className="nav-link scrollto" href="#services">Services</a></li>
                            <li><a className="nav-link scrollto" href="#work">Work</a></li>
                            <li><a className="nav-link scrollto" href="#certifications">Certifications</a></li>
                            {/* <li><Link to={``}><a className="nav-link scrollto" href="#blog">Blog</a></Link></li> */}
                            <li className="dropdown"><a href="/"><span>Drop Down</span> <i className="bi bi-chevron-down" /></a>
                                <ul>
                                    <li><a href="/">Drop Down 1</a></li>
                                    <li className="dropdown"><a href="/"><span>Deep Drop Down</span> <i className="bi bi-chevron-right" /></a>
                                        <ul>
                                            <li><a href="/">Deep Drop Down 1</a></li>
                                            <li><a href="/">Deep Drop Down 2</a></li>
                                            <li><a href="/">Deep Drop Down 3</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li><a className="nav-link scrollto" href="#contact">Contact</a></li>
                        </ul>
                        <i className="bi bi-list mobile-nav-toggle" />
                    </nav>{/* .navbar */}
                </div>
            </header>{/* End Header */}
        </>
    );
}
export default Header;