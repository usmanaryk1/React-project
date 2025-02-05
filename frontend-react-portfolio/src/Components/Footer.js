import { useEffect } from "react";
import { Link } from "react-router-dom";
import BacktotopBtn from "./BacktotopBtn";
import { toggleBacktotop, scrollToTop } from "./UtilFunctions/handleBacktotop";

const Footer = () => {
  useEffect(() => {
    // adds event on load and scroll
    window.addEventListener("load", toggleBacktotop);
    window.addEventListener("scroll", toggleBacktotop);

    // cleanup function to remove event on load and scroll
    return () => {
      window.removeEventListener("load", toggleBacktotop);
      window.removeEventListener("scroll", toggleBacktotop);
    };
  }, []);

  return (
    <>
      {/* ======= Footer ======= */}
      <footer id="footer">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="copyright-box">
                <div className="credits">
                  Designed by <Link to="/">PortfolioHub</Link>
                </div>
                <p className="copyright">
                  © Copyright <strong>PortfolioHub</strong>. All Rights Reserved
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* End  Footer */}

      <BacktotopBtn scrollToTop={scrollToTop} />
    </>
  );
};

export default Footer;
