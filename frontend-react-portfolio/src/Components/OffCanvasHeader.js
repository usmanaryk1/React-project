import { HashLink as Link } from "react-router-hash-link/dist/react-router-hash-link.cjs.production";
import { useEffect } from "react";
import { closeCanvas } from "./UtilFunctions/HandleOffcanvas";

const OffCanvasHeader = ({ navLinks, isActiveLink }) => {
  useEffect(() => {
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
    </>
  );
};

export default OffCanvasHeader;
