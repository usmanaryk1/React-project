import { useEffect } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  useEffect(() => {
    const toggleBacktotop = () => {
      const backtotop = document.querySelector(".back-to-top");
      if (backtotop) {
        if (window.scrollY > 100) {
          backtotop.classList.add("active");
        } else {
          backtotop.classList.remove("active");
        }
      }
    };

    window.addEventListener("load", toggleBacktotop);
    window.addEventListener("scroll", toggleBacktotop);

    return () => {
      window.removeEventListener("load", toggleBacktotop);
      window.removeEventListener("scroll", toggleBacktotop);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* ======= Footer ======= */}
      <footer id="footer">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="copyright-box">
                <p className="copyright">
                  © Copyright <strong>PortfolioHub</strong>. All Rights Reserved
                </p>
                <div className="credits">
                  Designed by <Link to="/">PortfolioHub</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* End  Footer */}
      {/*Back to top button*/}
      <Link
        to="/"
        className="back-to-top d-flex align-items-center justify-content-center"
        onClick={scrollToTop}
      >
        <i className="bi bi-arrow-up-short"></i>
      </Link>
    </>
  );
};

export default Footer;
