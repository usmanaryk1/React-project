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
  return (
    <>
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
    </>
  );
};

export default HorizontalHeader;
