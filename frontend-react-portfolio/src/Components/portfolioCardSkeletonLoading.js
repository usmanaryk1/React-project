import React from "react";

const PortfolioCardSkeletonLoading = () => {
  const skeletonStyle = {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexWrap: "wrap",
      width: "100%",
      height: "100vh",
    },
    card: {
      display: "flex",
      flexDirection: "column",
      flexBasis: "350px",
      flexShrink: 0,
      flexGrow: 0,
      maxWidth: "100%",
      backgroundColor: "#FFF",
      boxShadow: "0 5px 10px 0 rgba(0, 0, 0, 0.15)",
      borderRadius: "10px",
      overflow: "hidden",
      margin: "1rem",
    },
    cardImg: {
      width: "100%",
      paddingBottom: "56.25%",
      position: "relative",
      background: "linear-gradient(90deg, #e2e5e7 25%, #f5f5f5 50%, #e2e5e7 75%)",
      backgroundSize: "200% 100%",
      animation: "shine 1.5s infinite linear",
    },
    cardBody: {
      padding: "1.5rem",
    },
    cardTitle: {
      fontSize: "1.25rem",
      lineHeight: "1.33",
      fontWeight: "700",
      minHeight: "28px",
      borderRadius: "4px",
      width: "50%",
      background: "linear-gradient(90deg, #e2e5e7 25%, #f5f5f5 50%, #e2e5e7 75%)",
      backgroundSize: "200% 100%",
      animation: "shine 1.5s infinite linear",
    },
    cardIntro: {
      marginTop: "0.75rem",
      lineHeight: "1.5",
      display: "inline-block",
    },
    skelton1: {
      display: "inline-block",
      minHeight: "25px",
      minWidth: "80%",
      borderRadius: "4px",
      background: "linear-gradient(90deg, #e2e5e7 25%, #f5f5f5 50%, #e2e5e7 75%)",
      backgroundSize: "200% 100%",
      animation: "shine 1.5s infinite linear",
    },
    skelton2: {
      display: "inline-block",
      marginLeft: "25px",
      minHeight: "25px",
      minWidth: "9%",
      borderRadius: "100%",
      background: "linear-gradient(90deg, #e2e5e7 25%, #f5f5f5 50%, #e2e5e7 75%)",
      backgroundSize: "200% 100%",
      animation: "shine 1.5s infinite linear",
    },
    shimmerAnimation: `@keyframes shine {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }`,
  };

  return (
    <>
      <style>{skeletonStyle.shimmerAnimation}</style>
      <div style={skeletonStyle.container}>
        <div style={skeletonStyle.card}>
          <div style={skeletonStyle.cardImg}></div>
          <div style={skeletonStyle.cardBody}>
            <h2 style={skeletonStyle.cardTitle}></h2>
            <p style={{ ...skeletonStyle.cardIntro, ...skeletonStyle.skelton1 }}></p>
            <p style={{ ...skeletonStyle.cardIntro, ...skeletonStyle.skelton2 }}></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PortfolioCardSkeletonLoading;
