import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../CMSAdmin/Auth/AuthContext";

const Hero = ({ onDeleteClick, onEditClick, personalSkills = {} }) => {
  const { isAuthenticated, isAdminPage } = useAuth();
  const typedRef = useRef(null);
  const typedElementRef = useRef(null);
  const [TypedModule, setTypedModule] = useState(null);
  const [isComponentLoaded, setIsComponentLoaded] = useState(false);
  // console.log("Hero in user portal", hero);

  // Lazy load Typed.js AFTER the component is mounted
  useEffect(() => {
    setIsComponentLoaded(true);

    if (Object.keys(personalSkills).length > 0) {
      requestIdleCallback(() => {
        import("typed.js").then((mod) => setTypedModule(() => mod.default));
      });
    }
  }, [personalSkills]);

  // Start Typed.js after the component is fully loaded
  useEffect(() => {
    if (
      TypedModule &&
      isComponentLoaded &&
      Object.keys(personalSkills).length > 0 &&
      typedElementRef.current
    ) {
      setTimeout(() => {
        const typedStrings = personalSkills.skills
          ? personalSkills.skills.split(",")
          : [];
        if (typedStrings.length > 0 && typedElementRef.current) {
          typedRef.current = new TypedModule(typedElementRef.current, {
            strings: typedStrings,
            loop: true,
            typeSpeed: 100,
            backSpeed: 80,
            backDelay: 1500,
          });
        }
      }, 100); // Small delay to allow the DOM to settle
    }
    return () => typedRef.current?.destroy();
  }, [TypedModule, isComponentLoaded, personalSkills]);

  return (
    <>
      {personalSkills && (
        <div
          id="introduction"
          className="hero route bg-image"
          style={{
            backgroundImage: `url(${
              personalSkills.image
                ? personalSkills.image
                : "/assets/img/counters-bg.jpg"
            })`,
          }}
        >
          <div className="overlay-itro" />
          <div className="hero-content display-table">
            <div className="table-cell">
              {/* Admin Actions */}
              {isAuthenticated && isAdminPage && (
                <div className="admin-actions d-flex justify-content-end align-items-start">
                  <button
                    className="admin-btn btn btn-primary btn-sm me-1"
                    aria-label="Edit"
                    onClick={() => onEditClick(personalSkills)}
                  >
                    <i className="bi bi-pencil" />
                  </button>
                  <button
                    className="admin-btn btn btn-danger btn-sm me-5"
                    aria-label="Delete"
                    onClick={() => onDeleteClick(personalSkills._id)}
                  >
                    <i className="bi bi-trash" />
                  </button>
                </div>
              )}

              {/* Hero Content */}
              <div className="container">
                <h1 className="hero-title mb-4">{personalSkills.name}</h1>
                <p className="hero-subtitle">
                  {personalSkills.skills && (
                    <span
                      className="typed"
                      ref={typedElementRef}
                      data-typed-items={personalSkills.skills}
                    />
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
