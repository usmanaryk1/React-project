const CustomHero = ({ heroTitle, breadcrumbItem1 , breadcrumbItem2 , breadcrumbItem3}) => {
  return (
    <>
      <div className="hero hero-single route bg-image" alt = "Blog Details" style={{backgroundImage: "url(../assets/img/overlay-bg.jpg)"}}>
      <div className="overlay-mf"></div>
        <div className="hero-content display-table">
          <div className="table-cell">
            <div className="container">
              <h2 className="hero-title mb-4">{heroTitle}</h2>
              <ol className="breadcrumb d-flex justify-content-center">
                <li className="breadcrumb-item">
                  <a href="/">{breadcrumbItem1}</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="/">{breadcrumbItem2}</a>
                </li>
                <li className="breadcrumb-item active">{breadcrumbItem3}</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomHero;