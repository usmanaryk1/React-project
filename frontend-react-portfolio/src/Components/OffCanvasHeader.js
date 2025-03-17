import { HashLink as Link } from "react-router-hash-link/dist/react-router-hash-link.cjs.production";
import { Offcanvas } from "bootstrap";
import { useEffect } from "react";

const OffCanvasHeader = ({
  navLinks,
  isActiveLink,
  isAuthenticated,
  user,
  onLogout,
  preventRefresh,
  isAdminPage,
}) => {
  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );

    tooltipTriggerList.forEach((tooltipTriggerEl) => {
      new window.bootstrap.Tooltip(tooltipTriggerEl);
    });
  }, []);

  const closeCanvas = () => {
    const offcanvasElement = document.getElementById("offcanvasScrolling");
    const bsOffcanvas = Offcanvas.getInstance(offcanvasElement);
    if (bsOffcanvas) {
      bsOffcanvas.hide(); // Close the offcanvas
    }

    // Ensure the backdrop is removed
    setTimeout(() => {
      const backdrop = document.querySelector(".offcanvas-backdrop");
      if (backdrop) {
        backdrop.remove();
      }
      document.body.classList.remove("offcanvas-open"); // Removes any leftover classes that might be causing dimming
    }, 300); // Delay slightly to allow the transition to complete
  };

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
            style={{ fontSize: "1.5rem", color: "white" }}
          ></i>
        </button>

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
              {isAuthenticated && isAdminPage && (
                <Link
                  to="/"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  data-bs-html="true"
                  data-bs-title="Go to User Portal"
                >
                  <i
                    className="bi bi-arrow-repeat"
                    style={{ fontSize: "1.5rem", marginLeft: "1rem" }}
                  />
                </Link>
              )}
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
                <li className="dropdown nav-link">
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
                  </ul>
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
