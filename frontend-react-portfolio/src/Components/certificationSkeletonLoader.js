import React from "react";

const CertificationSkeletonLoader = () => {
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
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      margin: "1rem 0",
    },
    cardBox: {
      flex: "0 0 100%",
    //   flex: "0 0 33.3333%",
    //   maxWidth: "33.3333%",
      padding: "1rem",
    },
    card: {
      backgroundColor: "#fff",
      boxShadow: "0 5px 10px rgba(0, 0, 0, 0.15)",
      borderRadius: "10px",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      padding: "1rem",
    },
    cardImg: {
      position:"relative",
      width: "100%",
      height: "180px",
      ...shimmerStyle,
    },
    categoryBox: {
      position:"absolute",
      width: "25%",
      height: "30px",
      bottom:"-15px",
      left:"40%",
      border: "1px solid #c2c2c2",
      borderRadius:"10px",
      ...shimmerStyle,
    },
    cardBody: {
      marginTop: "10px",
      paddingTop: "1rem",
    },
    title: {
      width: "80%",
      height: "24px",
      marginBottom: "10px",
      ...shimmerStyle,
    },
    description: {
      width: "100%",
      height: "50px",
      marginBottom: "15px",
      ...shimmerStyle,
    },
    cardFooter: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    authorImage: {
      width: "40px",
      height: "40px",
      marginRight: "10px",
      ...shimmerStyle,
      borderRadius: "50%",
    },
    authorName: {
      width: "80px",
      height: "15px",
      marginTop: "10px",
      ...shimmerStyle,
    },
    postDate: {
      width: "50px",
      height: "15px",
      marginTop: "-20px",
      ...shimmerStyle,
    },
  };

  return (
    <>
      <style>{shimmerAnimation}</style>
      <div style={skeletonStyle.container}>
        <div style={skeletonStyle.cardBox}>
          <div style={skeletonStyle.card}>
            {/* Image */}
            <div style={skeletonStyle.cardImg}>
            <div style={skeletonStyle.categoryBox}></div>
            </div>


            {/* Card Body */}
            <div style={skeletonStyle.cardBody}>
              {/* <div style={skeletonStyle.categoryBox}></div> */}
              <div style={skeletonStyle.title}></div>
              <div style={skeletonStyle.description}></div>
            </div>

            {/* Footer */}
            <hr></hr>
            <div style={skeletonStyle.cardFooter}>
              <div style={skeletonStyle.author}>
                <div style={skeletonStyle.authorImage}></div>
                <div style={skeletonStyle.authorName}></div>
              </div>
              <div style={skeletonStyle.postDate}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CertificationSkeletonLoader;
