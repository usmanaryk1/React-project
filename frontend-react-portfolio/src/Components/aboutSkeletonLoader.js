import React from "react";
import ProfileImageSkeletonLoading from "./ProfileImageSkeletonLoading";

const AboutSkeletonLoader = () => {
  const shimmerAnimation = `
    @keyframes shine {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
  `;

  const shimmerStyle = {
    background: "linear-gradient(90deg, #e2e5e7 25%, #f5f5f5 50%, #e2e5e7 75%)",
    backgroundSize: "200% 100%",
    animation: "shine 1.5s infinite linear",
    borderRadius: "4px",
  };

  const skeletonStyle = {
    container: {
      padding: "40px",
      borderRadius: "10px",
      background: "#fff",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    },
    image: {
        width: "150px",
        height: "150px",
        ...shimmerStyle,
        background: "linear-gradient(120deg, #e2e5e7 25%, #f5f5f5 50%, #e2e5e7 75%)",

      },
    textBlock: {
      flex: 1,
    },
    line: (width) => ({
      width,
      height: "20px",
      marginBottom: "10px",
      ...shimmerStyle,
    }),
    lineBox: (width,height) => ({
      width,
      height,
      marginBottom: "10px",
      ...shimmerStyle,
    }),
  };

  return (
    <>
      <style>{shimmerAnimation}</style>
      <section id="about" className="about-mf sect-pt4 route">
        <div className="container" style={skeletonStyle.container}>
            <div className="row">
                <div className="col-md-6">
                    <div className="row col-md-12">
                    <div className="col-md-5">
                        <div style={skeletonStyle.image}></div>
                    </div>
                    <div className="col-md-7" style={{ marginTop: "20px" }}>
                        <div style={skeletonStyle.line("80%")} />
                        <div style={skeletonStyle.line("80%")} />
                        <div style={skeletonStyle.line("80%")} />
                        <div style={skeletonStyle.line("80%")} />
                     
                    </div>
                    </div>
                    <div className="col-md-12">
                        <div className="skill-mf" style={{ marginTop: "20px",  marginLeft: "15px" }}>
                        <div style={{ ...skeletonStyle.line("8%"), marginLeft: "-15px",marginBottom: "20px", }} />
                        <div style={skeletonStyle.line("20%")} />
                        <div style={skeletonStyle.line("85%")} />
                        <div style={skeletonStyle.line("20%")} />
                        <div style={skeletonStyle.line("85%")} />
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div style={skeletonStyle.textBlock}>
                    <div style={skeletonStyle.lineBox("20%", "35px")} />
                    <div style={skeletonStyle.lineBox("100%","270px")} />
            </div>
                </div>
            </div>
        </div>
      </section>
    </>
  );
};

export default AboutSkeletonLoader;
