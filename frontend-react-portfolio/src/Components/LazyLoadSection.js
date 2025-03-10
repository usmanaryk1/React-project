import React, { useState, useEffect, useRef } from "react";

const LazyLoadSection = ({ children, minHeight = "300px" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} style={{ minHeight }}>
      {isVisible ? children : <p>Loading...</p>}
    </div>
  );
};

export default LazyLoadSection;
