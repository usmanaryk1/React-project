const BlogsHero = ({ bgImgSrc, blog }) => {
  return (
    <>
      <div className="hero hero-single route bg-image " alt="BlogDetails" style={{
        backgroundImage: { bgImgSrc }
      }}>
        <div className="overlay-mf"></div>
        <div className="hero-content display-table">
          <div className="table-cell">
            <div className="container">
              <h2 className="hero-title mb-4">Blog Details</h2>
              <ol className="breadcrumb d-flex justify-content-center">
                <li className="breadcrumb-item">
                  <a href="/">Home</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="/">Library</a>
                </li>
                <li className="breadcrumb-item active">Data</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BlogsHero;