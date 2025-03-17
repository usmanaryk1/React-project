import { useState } from "react";
import { HashLink as Link } from "react-router-hash-link/dist/react-router-hash-link.cjs.production";

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
        <div className="container d-flex align-items-center justify-content-between">
          <h1 className="logo">
            <Link to="/" target="_blank">
              PortfolioHub
            </Link>
          </h1>
          <nav
            id="navbar"
            className={`navbar ${isMobileMenuOpen ? "navbar-mobile" : ""}`}
          >
            <ul>
              {navLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    className={`nav-link ${
                      isActiveLink(link.to) ? "active" : ""
                    }`}
                    smooth
                    to={link.to}
                    scroll={(el) => {
                      el.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    onClick={closeMobileMenu}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="download">
                <button
                  onClick={() => {
                    handleDownloadCV();
                    closeMobileMenu();
                  }}
                  className="btn"
                >
                  Download CV
                </button>
              </li>

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
                      {isAdminPage ? (
                        <li>
                          <Link smooth to="/" onClick={closeMobileMenu}>
                            Go to User Portal
                          </Link>
                        </li>
                      ) : (
                        <li>
                          <Link
                            smooth
                            to="/form/dashboard"
                            onClick={closeMobileMenu}
                          >
                            Go to Admin Portal
                          </Link>
                        </li>
                      )}
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
            </ul>
            <i
              className={`bi ${
                isMobileMenuOpen ? "bi-x" : "bi-list"
              } mobile-nav-toggle`}
              onClick={toggleMobileMenu}
            />
          </nav>
          {/* .navbar */}
        </div>
      </header>
    </>
  );
};

export default HorizontalHeader;
