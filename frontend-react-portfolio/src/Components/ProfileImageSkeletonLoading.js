
    import React from "react";

    // Pure CSS Skeleton Loading Animation With Shimmer
    
    const ProfileImageSkeletonLoading = () => {
      const skeletonStyle = {
        wrapper: {
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "300px",
          padding: "20px",
        },
        image: {
          width: "100%",
          height: "150px",
          background: "linear-gradient(90deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%)",
          backgroundSize: "200% 100%",
          borderRadius: "8px",
          animation: "shimmer 1.5s infinite linear",
        },
        text: {
          width: "100%",
          height: "20px",
          background: "linear-gradient(90deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%)",
          backgroundSize: "200% 100%",
          borderRadius: "4px",
          animation: "shimmer 1.5s infinite linear",
        },
        shortText: {
          width: "60%",
          height: "20px",
          background: "linear-gradient(90deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%)",
          backgroundSize: "200% 100%",
          borderRadius: "4px",
          animation: "shimmer 1.5s infinite linear",
        },
        keyframes: `
          @keyframes shimmer {
            0% { background-position: 100%; }
            100% { background-position: -100%; }
          }
        `,
      };
    
      return (
        <div style={skeletonStyle.wrapper}>
          <style>{skeletonStyle.keyframes}</style>
          <div style={skeletonStyle.image}></div>
          {/* <div style={skeletonStyle.text}></div>
          <div style={skeletonStyle.text}></div>
          <div style={skeletonStyle.shortText}></div> */}
        </div>
      );
    };
    
    export default ProfileImageSkeletonLoading;
    