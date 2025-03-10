import React, { useEffect, useRef, useState, lazy } from "react";
import { useAuth } from "../CMSAdmin/Auth/AuthContext";

const Hero = ({ onDeleteClick, onEditClick, hero = [] }) => {
  const { isAuthenticated, isAdminPage } = useAuth();
  const typedRef = useRef(null);
  const typedElementRef = useRef(null);
  const [TypedModule, setTypedModule] = useState(null);
  const [isComponentLoaded, setIsComponentLoaded] = useState(false);

  // Lazy load Typed.js AFTER the component is mounted
  useEffect(() => {
    setIsComponentLoaded(true);

    if (hero.length > 0) {
      requestIdleCallback(() => {
        import("typed.js").then((mod) => setTypedModule(() => mod.default));
      });
    }
  }, [hero]);

  // Start Typed.js after the component is fully loaded
  useEffect(() => {
    if (TypedModule && isComponentLoaded && hero.length > 0 && typedElementRef.current) {
      setTimeout(() => {
        const typedStrings = typedElementRef.current.getAttribute("data-typed-items")?.split(",");
        if (typedStrings && typedElementRef.current) {
          typedRef.current = new TypedModule(typedElementRef.current, {
            strings: typedStrings,
            loop: true,
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 2000,
          });
        }
      }, 100); // Small delay to allow the DOM to settle
    }
    return () => typedRef.current?.destroy();
  }, [TypedModule, isComponentLoaded, hero]);

  return (
    <>
      {hero.length > 0 && (
        <div
          id="hero"
          className="hero route bg-image"
          style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/assets/img/counters-bg.jpg)`,
          }}
        >
          <div className="overlay-itro" />
          <div className="hero-content display-table">
            <div className="table-cell">
              {/* Admin Actions */}
              {isAuthenticated && isAdminPage && (
                <div className="admin-actions d-flex justify-content-end align-items-start">
                  {hero.map((heroItem) => (
                    <div key={heroItem._id}>
                      <button
                        className="admin-btn btn btn-primary btn-sm me-1"
                        aria-label="Edit"
                        onClick={() => onEditClick(heroItem)}
                      >
                        <i className="bi bi-pencil" />
                      </button>
                      <button
                        className="admin-btn btn btn-danger btn-sm me-5"
                        aria-label="Delete"
                        onClick={() => onDeleteClick(heroItem._id)}
                      >
                        <i className="bi bi-trash" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Hero Content */}
              {hero.map((heroItem) => (
                <div className="container" key={heroItem._id}>
                  <h1 className="hero-title mb-4">I am {heroItem.name}</h1>
                  <p className="hero-subtitle">
                    {heroItem.skills && (
                      <span
                        className="typed"
                        ref={typedElementRef}
                        data-typed-items={heroItem.skills}
                      />
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
