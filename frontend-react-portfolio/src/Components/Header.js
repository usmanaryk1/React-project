// import { HashLink as Link } from "react-router-hash-link/dist/react-router-hash-link.cjs.production";
// import React, { useEffect, useState } from "react";
// import { useAuth } from "../CMSAdmin/Auth/AuthContext";

// const Header = () => {
//   const [navLinks, setNavLinks] = useState([]);

//   const { user, onLogout, isAdminPage, isAuthenticated } = useAuth();

//   const preventRefresh = (e) => {
//     e.preventDefault();
//   };
//   console.log("header user", user);
//   useEffect(() => {
//     //need to change logic
//     if (isAuthenticated && isAdminPage) {
//       setNavLinks([
//         { to: "/form/dashboard", label: "Dashboard" },
//         { to: "/form/hero-form", label: "Home" },
//         { to: "/form/about-form", label: "About" },
//         { to: "/form/service-form", label: "Services" },
//         { to: "/form/counter-form", label: "Counter" },
//         { to: "/form/portfolio-form", label: "Works" },
//         { to: "/form/testimonial-form", label: "Testimonial" },
//         { to: "/form/certification-form", label: "Certification" },
//         { to: "/form/contact-form", label: "Contact" },
//         { to: "/form/social-form", label: "Social Links" },
//       ]);
//     } else {
//       setNavLinks([
//         { to: "/#hero", label: "Home" },
//         { to: "/#about", label: "About" },
//         { to: "/#services", label: "Services" },
//         { to: "/#work", label: "Work" },
//         { to: "/#certifications", label: "Certifications" },
//         { to: "/#contact", label: "Contact" },
//       ]);
//     }
//   }, [isAuthenticated, isAdminPage]);

//   return (
//     <>
//       {/* ======= Header ======= */}
//       <header
//         id="header"
//         className={`fixed-top ${
//           isAuthenticated && isAdminPage ? "vertical-header" : ""
//         }`}
//       >
//         <div className="container d-flex align-items-center justify-content-between">
//           {!isAdminPage && (
//             <h1 className="logo">
//               <a href="index.html">Portfolio</a>
//             </h1>
//           )}
//           {/* <h1 className="logo"><a href="index.html">Portfolio</a></h1> */}
//           {/* Uncomment below if you prefer to use an image logo */}
//           <nav
//             id="navbar"
//             className={`navbar ${
//               isAuthenticated && isAdminPage ? "vertical-navbar" : ""
//             }`}
//           >
//             {/* <a href="index.html" class="logo"><img src="assets/img/logo/png" alt="" class="img-fluid"/></a> */}
//             <ul>
//               {navLinks.map((link, index) => (
//                 <li key={index}>
//                   <Link className="nav-link" smooth to={link.to}>
//                     {link.label}
//                   </Link>
//                 </li>
//               ))}

//               <li className="dropdown nav-link">
//                 {isAuthenticated && user ? (
//                   <>
//                     <a href="/" onClick={preventRefresh}>
//                       <span>{user.username}</span>
//                       <i className="bi bi-chevron-down" />
//                     </a>
//                     <ul>
//                       <li>
//                         <Link smooth to="/" onClick={onLogout}>
//                           LogOut
//                         </Link>
//                       </li>
//                       {isAdminPage ? (
//                         <li>
//                           <Link smooth to="/">
//                             Go to User Portal
//                           </Link>
//                         </li>
//                       ) : (
//                         <li>
//                           <Link smooth to="/form/dashboard">
//                             Go to Admin Portal
//                           </Link>
//                         </li>
//                       )}
//                     </ul>
//                   </>
//                 ) : (
//                   <>
//                     <a href="/" onClick={preventRefresh}>
//                       <span>Register</span>
//                       <i
//                         className={`bi bi-chevron-down ${
//                           user && isAdminPage ? "bi bi-chevron-right" : ""
//                         }`}
//                       />
//                     </a>
//                     <ul>
//                       <li>
//                         <Link smooth to="/form/login-form">
//                           LogIn
//                         </Link>
//                       </li>
//                     </ul>
//                   </>
//                 )}
//               </li>

//               {/* <li><Link className="nav-link  active" smooth to="/#hero">Home</Link></li>
//                             <li><Link className="nav-link" smooth to="/#about">About</Link></li>
//                             <li><Link className="nav-link" smooth to="/#services">Services</Link></li>
//                             <li><Link className="nav-link" smooth to="/#work">Work</Link></li>
//                             <li><Link className="nav-link" smooth to="/#certifications">Certifications</Link></li>
//                             {/* <li><Link to={``}><a className="nav-link scrollto" href="#blog">Blog</a></Link></li> */}
//               {/* <li className="dropdown"><a href="/"><span>Drop Down</span> <i className="bi bi-chevron-down" /></a>
//                                 <ul>
//                                     <li><a href="/">Drop Down 1</a></li>
//                                     <li className="dropdown"><a href="/"><span>Deep Drop Down</span> <i className="bi bi-chevron-right" /></a>
//                                         <ul>
//                                             <li><a href="/">Deep Drop Down 1</a></li>
//                                             <li><a href="/">Deep Drop Down 2</a></li>
//                                             <li><a href="/">Deep Drop Down 3</a></li>
//                                         </ul>
//                                     </li>
//                                 </ul>
//                             </li>
//                             <li><Link className="nav-link" smooth to="/#contact">Contact</Link></li>
//                             <li><Link className="nav-link" smooth to="/form">Upload Info</Link></li> */}
//             </ul>
//             <i className="bi bi-list mobile-nav-toggle" />
//           </nav>
//           {/* .navbar */}
//         </div>
//       </header>
//       {/* End Header */}
//     </>
//   );
// };
// export default Header;

import { HashLink as Link } from "react-router-hash-link/dist/react-router-hash-link.cjs.production";
import React, { useEffect, useState } from "react";
import { useAuth } from "../CMSAdmin/Auth/AuthContext";
import { useLocation } from "react-router-dom/cjs/react-router-dom";

const Header = () => {
  const [navLinks, setNavLinks] = useState([]);
  const { user, onLogout, isAdminPage, isAuthenticated } = useAuth();
  const location = useLocation();
  const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

  const preventRefresh = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    // Update the navLinks based on authentication and admin page status
    if (isAuthenticated && isAdminPage) {
      setNavLinks([
        { to: "/form/dashboard", label: "Dashboard" },
        { to: "/form/hero-form", label: "Home" },
        { to: "/form/about-form", label: "About" },
        { to: "/form/service-form", label: "Services" },
        { to: "/form/counter-form", label: "Counter" },
        { to: "/form/portfolio-form", label: "Works" },
        { to: "/form/testimonial-form", label: "Testimonial" },
        { to: "/form/certification-form", label: "Certification" },
        { to: "/form/contact-form", label: "Contact" },
        { to: "/form/social-form", label: "Social Links" },
        { to: "/form/CV-form", label: "Upload CV" },
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
            tabindex="-1"
            id="offcanvasScrolling"
            aria-labelledby="offcanvasScrollingLabel"
          >
            <div className="offcanvas-header">
              <h1 className="offcanvas-title logo" id="offcanvasScrollingLabel">
                <a href="index.html">Portfolio</a>
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
                              LogOut
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
                              LogIn
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
              <a href="index.html">Portfolio</a>
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
                {user && (
                  <li className="download">
                    <a
                      href={`${API_URL}/api/download-cv?userId=${user._id}`}
                      download
                    >
                      Download CV
                    </a>
                  </li>
                )}
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
                            LogOut
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
                            LogIn
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
