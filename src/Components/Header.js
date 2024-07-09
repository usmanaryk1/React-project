import { HashLink as Link } from "react-router-hash-link/dist/react-router-hash-link.cjs.production";
import React, { useEffect, useState } from 'react';
import { useAuth } from '../CMSAdmin/Auth/AuthContext';

const Header = () => {

    const [navLinks, setNavLinks] = useState([]);
    
    const { user, onLogout, isAdminPage } = useAuth();

    const preventRefresh = (e) => {
        e.preventDefault();
    }
console.log('header user', user)
    useEffect(() => {
        //need to change logic
        if (user && isAdminPage) {
            setNavLinks([
                { to: '/form/dashboard', label: 'Dashboard' },
                // { to: '/form/hero-form', label: 'Home' },
                // { to: '/form/about-form', label: 'About' },
                // { to: '/form/service-form', label: 'Services' },
                // { to: '/form/counter-form', label: 'Counter' },
                { to: '/form/portfolio-form', label: 'Works' },
                { to: '/form/portfolioDetails-form', label: 'Work Details' },
                // { to: '/form/testimonial-form', label: 'Testimonial' },
                { to: '/form/certification-form', label: 'Certification' },
                { to: '/form/contact-form', label: 'Contact' },
            ]);

        } else {
            setNavLinks([
                { to: '/#hero', label: 'Home' },
                { to: '/#about', label: 'About' },
                { to: '/#services', label: 'Services' },
                { to: '/#work', label: 'Work' },
                { to: '/#certifications', label: 'Certifications' },
                { to: '/#contact', label: 'Contact' },
            ]);
        }
    }, [user, isAdminPage]);


    return (
        <>
            {/* ======= Header ======= */}
            <header id="header" className="fixed-top">
                <div className="container d-flex align-items-center justify-content-between">
                    <h1 className="logo"><a href="index.html">Portfolio</a></h1>
                    {/* Uncomment below if you prefer to use an image logo */}
                    <nav id="navbar" className="navbar">
                        {/* <a href="index.html" class="logo"><img src="assets/img/logo/png" alt="" class="img-fluid"/></a> */}
                        <ul>
                            {navLinks.map((link, index) => (
                                <li key={index}>
                                    <Link className="nav-link" smooth to={link.to}>{link.label}</Link>
                                </li>
                            ))}

                            <li className="dropdown nav-link">
                                {user ? (
                                    <>
                                        <a href="/" onClick={preventRefresh}><span>{user.username}</span><i className="bi bi-chevron-down" /></a>
                                        <ul>
                                            <li><Link smooth to="/" onClick={onLogout}>LogOut</Link></li>
                                            {isAdminPage ? (
                                                <li><Link smooth to="/">Go to User Portal</Link></li>
                                            ) : (
                                                <li><Link smooth to="/form/dashboard">Go to Admin Portal</Link></li>
                                            )}
                                        </ul>
                                    </>
                                ) : (
                                    <>
                                        <a href="/" onClick={preventRefresh}><span>Register</span><i className="bi bi-chevron-down" /></a>
                                        <ul>
                                            {/* <li><Link smooth to="/form/signup-form">Sign Up</Link></li> */}
                                            <li><Link smooth to="/form/login-form">LogIn</Link></li>
                                        </ul>
                                    </>
                                )}
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