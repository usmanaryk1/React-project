import { HashLink as Link } from "react-router-hash-link/dist/react-router-hash-link.cjs.production";
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

const Header = () => {

    const location = useLocation();
    const [navLinks, setNavLinks] = useState([]);
    const [portalLinks, setPortalLinks] = useState([]);

    useEffect(() => {
        if (location.pathname.startsWith('/form')) {
            setNavLinks([
                { to: '/form/dashboard', label: 'Dashboard' },
                { to: '/form/hero-form', label: 'Home' },
                { to: '/form/about-form', label: 'About' },
                { to: '/form/service-form', label: 'Service' },
                { to: '/form/portfolio-form', label: 'Portfolio' },
                { to: '/form/certification-form', label: 'Certification' },
                { to: '/form/contact-form', label: 'Contact' },
            ]);
            setPortalLinks([
                { to: '/#hero', label: 'Go to user Portal' },
            ]);
            const header = document.querySelector("#header");
            header.style.backgroundColor = "black";
        } else {
            setNavLinks([
                { to: '/#hero', label: 'Home' },
                { to: '/#about', label: 'About' },
                { to: '/#services', label: 'Services' },
                { to: '/#work', label: 'Work' },
                { to: '/#certifications', label: 'Certifications' },
                { to: '/#contact', label: 'Contact' },
            ]);
            setPortalLinks([
                { to: '/form/dashboard', label: 'Go to Admin Portal' },
            ]);
            const onscroll = (el, listener) => {
                el.addEventListener('scroll', listener)
            }

            const selectHeader = document.querySelector('#header');
            if (selectHeader) {

                const headerScrolled = () => {
                    if (window.scrollY > 100) {
                        selectHeader.classList.add('header-scrolled');
                    } else {
                        selectHeader.classList.remove('header-scrolled');
                    }
                };
                window.addEventListener('load', headerScrolled);
                onscroll(document, headerScrolled);

            };
        }

        // if (location.pathname.startsWith('/form')) {
        //     setPortalLinks([
        //         { to: '/#hero', label: 'Go to user Portal' },
        //     ]);
        // } else {
        //     setPortalLinks([
        //         { to: '/form/dashboard', label: 'Go to Admin Portal' },
        //     ]);
        // }
    }, [location.pathname]);

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
                            {navLinks.map((link, index) => (
                                <li key={index}>
                                    <Link className="nav-link" smooth to={link.to}>{link.label}</Link>
                                </li>
                            ))}

                            <li className="dropdown nav-link fixed-top"><Link smooth to="/form/login-form"><span>Login</span> <i className="bi bi-chevron-down" /></Link>
                                <ul>
                                    <li><Link smooth to="/form/login-form">Login</Link></li>
                                    {portalLinks.map((direct, index) => (
                                        <li key={index}>
                                            <Link smooth to={direct.to}><span>{direct.label}</span></Link>
                                        </li>
                                    ))}

                                </ul>
                            </li>
                            {/* <li><Link className="nav-link  active" smooth to="/#hero">Home</Link></li>
                            <li><Link className="nav-link" smooth to="/#about">About</Link></li>
                            <li><Link className="nav-link" smooth to="/#services">Services</Link></li>
                            <li><Link className="nav-link" smooth to="/#work">Work</Link></li>
                            <li><Link className="nav-link" smooth to="/#certifications">Certifications</Link></li>
                            {/* <li><Link to={``}><a className="nav-link scrollto" href="#blog">Blog</a></Link></li> */}
                            {/* <li className="dropdown"><a href="/"><span>Drop Down</span> <i className="bi bi-chevron-down" /></a>
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
                            <li><Link className="nav-link" smooth to="/#contact">Contact</Link></li>
                            <li><Link className="nav-link" smooth to="/form">Upload Info</Link></li> */}
                        </ul>
                        <i className="bi bi-list mobile-nav-toggle" />
                    </nav>{/* .navbar */}
                </div>
            </header>{/* End Header */}
        </>
    );
}
export default Header;