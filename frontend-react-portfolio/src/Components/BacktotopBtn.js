import { HashLink as Link } from "react-router-hash-link/dist/react-router-hash-link.cjs.production";

const BacktotopBtn = ({ scrollToTop }) => {
  return (
    <>
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

export default BacktotopBtn;
