import { useEffect, useState } from "react";
import { HashLink as Link } from "react-router-hash-link/dist/react-router-hash-link.cjs.production";
import { handleTooltip } from "./UtilFunctions/TooltipFunction";
import { closeCanvas } from "./UtilFunctions/HandleOffcanvas";

const HorizontalHeader = ({
  navLinks,
  isActiveLink,
  isAuthenticated,
  user,
  preventRefresh,
  isAdminPage,
  handleDownloadCV,
  onLogout,
}) => {
  useEffect(() => {
    handleTooltip();
  }, []);
  const [isMobileMenuOpen, setMobileMenu] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  // Function to toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenu(!isMobileMenuOpen);
  };

  // Function to close the mobile menu
  const closeMobileMenu = () => {
    setMobileMenu(false);
  };

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  return (
    <>
      <header id="header" className="fixed-top">
        <div className="container">
          {/* <h1 className="logo">
            <Link to="/" target="_blank">
              Portfolio
            </Link>
          </h1> */}
          <div className="d-flex justify-content-between">
            <button
              className="btn toggle-button"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasScrolling"
              aria-controls="offcanvasScrolling"
            >
              <i
                className="bi bi-list"
                style={{ fontSize: "1.5rem", color: "white" }}
              ></i>
            </button>
            <nav
              id="navbar"
              className={`navbar ${isMobileMenuOpen ? "navbar-mobile" : ""}`}
            >
              <ul>
                {/* <li className="download">
                <button
                  onClick={() => {
                    handleDownloadCV();
                    closeMobileMenu();
                  }}
                  className="btn"
                >
                  Download CV
                </button>
              </li> */}

                <li className="dropdown nav-link">
                  {isAuthenticated && user ? (
                    <>
                      <a
                        href="/"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleDropdown("user");
                        }}
                      >
                        <span>{user.username}</span>
                        <i className="bi bi-chevron-down" />
                      </a>
                      <ul
                        className={
                          activeDropdown === "user" ? "dropdown-active" : ""
                        }
                      >
                        <li>
                          <Link
                            smooth
                            to="/"
                            onClick={() => {
                              closeMobileMenu();
                              onLogout();
                            }}
                          >
                            Log Out
                          </Link>
                        </li>
                      </ul>
                    </>
                  ) : (
                    <>
                      <a
                        href="/"
                        onClick={(e) => {
                          e.preventDefault();
                          preventRefresh();
                        }}
                      >
                        <span>Register</span>
                        <i className="bi bi-chevron-down" />
                      </a>
                      <ul>
                        <li>
                          <Link
                            smooth
                            to="/form/login-form"
                            onClick={closeMobileMenu}
                          >
                            Log in
                          </Link>
                        </li>
                      </ul>
                    </>
                  )}
                </li>
                {isAuthenticated && (
                  <Link
                    to="form/dashboard"
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    data-bs-html="true"
                    data-bs-title="Go to Admin Portal"
                  >
                    <i
                      className="bi bi-arrow-left-right"
                      style={{ fontSize: "1.5rem" }}
                    />
                  </Link>
                )}
              </ul>
              {/* <i
              className={`bi ${
                isMobileMenuOpen ? "bi-x" : "bi-list"
              } mobile-nav-toggle`}
              onClick={toggleMobileMenu}
            /> */}
            </nav>
          </div>

          <div
            className="offcanvas offcanvas-start"
            data-bs-scroll="true"
            data-bs-backdrop="true"
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
                          isActiveLink(link.to) ? "active" : ""
                        }`}
                        smooth
                        to={link.to}
                        onClick={() => closeCanvas()}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
          {/* .navbar */}
        </div>
      </header>
    </>
  );
};

export default HorizontalHeader;
