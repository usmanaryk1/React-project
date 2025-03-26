import { HashLink as Link } from "react-router-hash-link/dist/react-router-hash-link.cjs.production";
import { useEffect } from "react";
import { handleTooltip } from "./UtilFunctions/TooltipFunction";
import { closeCanvas } from "./UtilFunctions/HandleOffcanvas";

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
    handleTooltip();
    const offcanvasElement = document.getElementById("offcanvasScrolling");
    if (offcanvasElement) {
      const removeBackdrop = () => {
        setTimeout(() => {
          const backdrop = document.querySelector(".offcanvas-backdrop");
          if (backdrop) {
            backdrop.remove(); // Ensure the backdrop is removed
          }
          document.body.classList.remove("offcanvas-open");
        }, 100);
      };

      offcanvasElement.addEventListener("hidden.bs.offcanvas", removeBackdrop);

      return () => {
        offcanvasElement.removeEventListener(
          "hidden.bs.offcanvas",
          removeBackdrop
        );
      };
    }
  }, []);

  return (
    <>
      <header id="header" className="fixed-top vertical-header">
        <div className="d-flex justify-content-between align-items-center">
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
          {isAuthenticated && isAdminPage && (
            <Link
              to="/"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              data-bs-html="true"
              data-bs-title="Go to User Portal"
              style={{ marginRight: "1rem" }}
            >
              <i
                className="bi bi-arrow-left-right"
                style={{
                  fontSize: "1.5rem",
                  color: "white",
                  paddingTop: "1rem",
                }}
              />
            </Link>
          )}
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
