import { useEffect, useState } from "react";
import { HashLink as Link } from "react-router-hash-link/dist/react-router-hash-link.cjs.production";
import { handleTooltip } from "./UtilFunctions/TooltipFunction";

const HorizontalHeader = ({
  isAuthenticated,
  user,
  preventRefresh,
  isAdminPage,
  onLogout,
}) => {
  useEffect(() => {
    if (isAuthenticated) {
      handleTooltip();
    }
  }, [isAuthenticated, isAdminPage]);

  const [activeDropdown, setActiveDropdown] = useState(null);

  // Function to toggle the dropdown
  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  return (
    <>
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
        <nav id="navbar" className="navbar">
          <ul>
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
                      <Link smooth to="/form/login-form">
                        Log in
                      </Link>
                    </li>
                  </ul>
                </>
              )}
            </li>
            {isAuthenticated && (
              <Link
                to={isAdminPage ? "/" : "form/dashboard"}
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                data-bs-html="true"
                data-bs-title={
                  isAdminPage ? "Go to User Portal" : "Go to Admin Portal"
                }
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
    </>
  );
};

export default HorizontalHeader;
