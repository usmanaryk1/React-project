import React from "react";

const HeroSkeletonLoader = () => {
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
    heroContainer: {
      position: "relative",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    //   background: "url(../assets/img/counters-bg.jpg) center/cover no-repeat",
      color: "#fff",
      textAlign: "center",
      flexDirection: "column",
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
    title: {
      width: "60%",
      height: "70px",
      marginBottom: "20px",
      border: "2px solid #ffffff",
      ...shimmerStyle,
    },
    subtitle: {
      width: "40%",
      height: "30px",
      border: "2px solid #ffffff",
      ...shimmerStyle,
    },
    buttonsContainer: {
      display: "flex",
      gap: "10px",
    },
    button: {
      width: "100px",
      height: "40px",
      borderRadius: "5px",
      border: "2px solid #ffffff",
      ...shimmerStyle,
    },
  };

  return (
    <>
      <style>{shimmerAnimation}</style>
      <div style={skeletonStyle.heroContainer}>
        <div style={skeletonStyle.overlay}></div>
        <h1 style={skeletonStyle.title}></h1>
        <p style={skeletonStyle.subtitle}></p>
        <div style={skeletonStyle.buttonsContainer}>
          <div style={skeletonStyle.button}></div>
          <div style={skeletonStyle.button}></div>
        </div>
      </div>
    </>
  );
};

export default HeroSkeletonLoader;
