const BlogsHero = () => {
  return (
    <>
      <div class="hero hero-single route bg-image" style={{
        backgroundImage: "url(assets/img/overlay-bg.jpg)"
      }}>
        <div class="overlay-mf"></div>
        <div class="hero-content display-table">
          <div class="table-cell">
            <div class="container">
              <h2 class="hero-title mb-4">Blog Details</h2>
              <ol class="breadcrumb d-flex justify-content-center">
                <li class="breadcrumb-item">
                  <a href="/">Home</a>
                </li>
                <li class="breadcrumb-item">
                  <a href="/">Library</a>
                </li>
                <li class="breadcrumb-item active">Data</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BlogsHero;