// import { Link } from "react-router-dom/cjs/react-router-dom";
import { HashLink as Link} from "react-router-hash-link/dist/react-router-hash-link.cjs.production";
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
                            <li><Link className="nav-link scrollto active" smooth to="/#hero">Home</Link></li>
                            <li><Link className="nav-link scrollto" smooth to="/#about">About</Link></li>
                            <li><Link className="nav-link scrollto" smooth to="/#services">Services</Link></li>
                            <li><Link className="nav-link scrollto" smooth to="/#work">Work</Link></li>
                            <li><Link className="nav-link scrollto" smooth to="/#certifications">Certifications</Link></li>
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
                            <li><Link className="nav-link scrollto" smooth to="/#contact">Contact</Link></li>
                        </ul>
                        <i className="bi bi-list mobile-nav-toggle" />
                    </nav>{/* .navbar */}
                </div>
            </header>{/* End Header */}
        </>
    );
}
export default Header;