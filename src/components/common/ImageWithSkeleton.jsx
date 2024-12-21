import React, { useState } from "react";

const ImageWithSkeleton = ({
  src,
  alt,
  skeletonHeight = "100%",
  className,
}) => {
  const [loaded, setLoaded] = useState(false);

  const handleImageLoad = () => {
    setLoaded(true);
  };

  return (
    // <div style={{ position: "relative", display: "inline-block" }}>
    <>
      {/* 스켈레톤 */}
      {!loaded && (
        <div
          style={{
            height: skeletonHeight,
            width: "100%",
            backgroundColor: "#e0e0e0",
            borderRadius: "8px",
            animation: "pulse 1.5s infinite",
          }}
        ></div>
      )}

      {/* 이미지 */}
      <img
        src={src}
        alt={alt}
        style={{
          display: loaded ? "block" : "none",
          width: "100%",
        }}
        onLoad={handleImageLoad}
        className={className}
      />
    </>
  );
};

export default ImageWithSkeleton;
