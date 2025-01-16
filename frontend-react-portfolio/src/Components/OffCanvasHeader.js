import { HashLink as Link } from "react-router-hash-link/dist/react-router-hash-link.cjs.production";

const OffCanvasHeader = ({
  navLinks,
  isActiveLink,
  isAuthenticated,
  user,
  onLogout,
  preventRefresh,
  isAdminPage,
}) => {
  return (
    <>
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
                        isActiveLink(link.to) ? "active" : ""
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
    </>
  );
};

export default OffCanvasHeader;
