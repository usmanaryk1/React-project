import { HashLink as Link } from "react-router-hash-link/dist/react-router-hash-link.cjs.production";
import React, { useEffect, useState } from "react";
import { useAuth } from "../CMSAdmin/Auth/AuthContext";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
const Header = () => {
  const [navLinks, setNavLinks] = useState([]);
  const { user, onLogout, isAdminPage, isAuthenticated } = useAuth();
  const location = useLocation();

  const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

  const preventRefresh = (e) => {
    e.preventDefault();
  };

  const handleDownloadCV = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `${API_URL}/api/download-cv/${user._id}`,
        {
          responseType: "blob", // Ensures the file is treated as binary data
        }
      );

      if (response.status === 200) {
        // Create a link element and trigger the download
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "My CV.pdf"); // Set the file name dynamically if needed
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        toast.error("Failed to download CV");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("CV not found");
      } else {
        console.error(error); // Log detailed error for debugging
        toast.error("An error occurred while downloading the CV");
      }
    }
  };

  useEffect(() => {
    // Update the navLinks based on authentication and admin page status
    if (isAuthenticated && isAdminPage) {
      setNavLinks([
        { to: "/form/dashboard", label: "Dashboard" },
        { to: "/form/hero-form", label: "Home" },
        { to: "/form/about-form", label: "About" },
        { to: "/form/skills-form", label: "Skills" },
        { to: "/form/service-form", label: "Services" },
        { to: "/form/counter-form", label: "Counter" },
        { to: "/form/portfolio-form", label: "Works" },
        { to: "/form/testimonial-form", label: "Testimonial" },
        { to: "/form/certification-form", label: "Certification" },
        { to: "/form/contact-form", label: "Contact" },
        { to: "/form/social-form", label: "Social Links" },
        { to: "/form/CV-form", label: "Upload CV" },
        { to: "/form/termsandconditions", label: "Terms and Conditions" },
      ]);
    } else {
      setNavLinks([
        { to: "/#hero", label: "Home" },
        { to: "/#about", label: "About" },
        { to: "/#services", label: "Services" },
        { to: "/#work", label: "Work" },
        { to: "/#certifications", label: "Certifications" },
        // { to: "/#contact", label: "Contact" },
      ]);
    }
  }, [isAuthenticated, isAdminPage]);

  const ActiveLink = (link) => {
    // console.log("Location", location, "Link:", link);
    return location.pathname === link;
  };

  const isActiveLink = (link) => {
    const linkHash = link.split("#")[1] ? `#${link.split("#")[1]}` : null;

    // console.log("Location", location);
    // console.log("link:", link);

    // Check if the location's hash matches the link hash
    return location.hash === linkHash || location.pathname === link;
  };

  return (
    <>
      {isAdminPage && isAuthenticated ? (
        <header id="header" className="fixed-top vertical-header">
          <button
            className="btn toggle-button"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasScrolling"
            aria-controls="offcanvasScrolling"
          >
            <i
              className="bi bi-list"
              style={{ fontSize: "2rem", color: "white" }}
            ></i>
          </button>

          <div
            className="offcanvas offcanvas-start"
            data-bs-scroll="true"
            data-bs-backdrop="false"
            tabIndex="-1"
            id="offcanvasScrolling"
            aria-labelledby="offcanvasScrollingLabel"
          >
            <div className="offcanvas-header">
              <h1 className="offcanvas-title logo" id="offcanvasScrollingLabel">
                <Link to="/">PortfolioHub</Link>
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <nav id="navbar" className="vertical-navbar">
                <ul>
                  {navLinks.map((link, index) => (
                    <li key={index}>
                      <Link
                        className={`nav-link ${
                          ActiveLink(link.to) ? "active" : ""
                        }`}
                        smooth
                        to={link.to}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                  <li className="dropdown nav-link">
                    {isAuthenticated && user ? (
                      <>
                        <a href="/" onClick={preventRefresh}>
                          <span>{user.username}</span>
                          <i className="bi bi-chevron-down" />
                        </a>
                        <ul>
                          <li>
                            <Link smooth to="/" onClick={onLogout}>
                              Log Out
                            </Link>
                          </li>
                          {isAdminPage ? (
                            <li>
                              <Link smooth to="/">
                                Go to User Portal
                              </Link>
                            </li>
                          ) : (
                            <li>
                              <Link smooth to="/form/dashboard">
                                Go to Admin Portal
                              </Link>
                            </li>
                          )}
                        </ul>
                      </>
                    ) : (
                      <>
                        <a href="/" onClick={preventRefresh}>
                          <span>Register</span>
                          <i
                            className={`bi bi-chevron-down ${
                              user && isAdminPage ? "bi bi-chevron-right" : ""
                            }`}
                          />
                        </a>
                        <ul>
                          <li>
                            <Link smooth to="/form/login-form">
                              Log in
                            </Link>
                          </li>
                        </ul>
                      </>
                    )}
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>
      ) : (
        <header id="header" className="fixed-top">
          <div className="container d-flex align-items-center justify-content-between">
            <h1 className="logo">
              <Link to="/" target="_blank">
                PortfolioHub
              </Link>
            </h1>
            <nav id="navbar" className="navbar">
              <ul>
                {navLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      className={`nav-link ${
                        isActiveLink(link.to) ? "active" : ""
                      }`}
                      smooth
                      to={link.to}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li className="download">
                  <button onClick={handleDownloadCV} className="btn">
                    Download CV
                  </button>
                </li>
                <li className="dropdown nav-link">
                  {isAuthenticated && user ? (
                    <>
                      <a href="/" onClick={preventRefresh}>
                        <span>{user.username}</span>
                        <i className="bi bi-chevron-down" />
                      </a>
                      <ul>
                        <li>
                          <Link smooth to="/" onClick={onLogout}>
                            Log Out
                          </Link>
                        </li>
                        {isAdminPage ? (
                          <li>
                            <Link smooth to="/">
                              Go to User Portal
                            </Link>
                          </li>
                        ) : (
                          <li>
                            <Link smooth to="/form/dashboard">
                              Go to Admin Portal
                            </Link>
                          </li>
                        )}
                      </ul>
                    </>
                  ) : (
                    <>
                      <a href="/" onClick={preventRefresh}>
                        <span>Register</span>
                        <i className="bi bi-chevron-down" />
                      </a>
                      <ul>
                        <li>
                          <Link smooth to="/form/login-form">
                            Log in
                          </Link>
                        </li>
                      </ul>
                    </>
                  )}
                </li>
              </ul>
              <i className="bi bi-list mobile-nav-toggle" />
            </nav>
            {/* .navbar */}
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
