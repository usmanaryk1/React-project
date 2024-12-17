import { HashLink as Link } from "react-router-hash-link/dist/react-router-hash-link.cjs.production";
const CustomHero = ({
  heroTitle,
  breadcrumbItem1,
  breadcrumbItem2,
  breadcrumbItem3,
  link1,
  link2,
}) => {
  return (
    <>
      <div
        className="hero hero-single route bg-image"
        alt="Blog Details"
        style={{ backgroundImage: "url(../assets/img/overlay-bg.jpg)" }}
      >
        <div className="overlay-mf"></div>
        <div className="hero-content display-table">
          <div className="table-cell">
            <div className="container">
              <h2 className="hero-title mb-4">{heroTitle}</h2>
              <ol className="breadcrumb d-flex justify-content-center">
                <li className="breadcrumb-item">
                  <Link to={link1}>{breadcrumbItem1}</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to={link2}>{breadcrumbItem2}</Link>
                </li>
                <li className="breadcrumb-item active">{breadcrumbItem3}</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomHero;
