import React, { useEffect, useState, useMemo } from "react";
import { useAuth } from "../CMSAdmin/Auth/AuthContext";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import HorizontalHeader from "./HorizontalHeader";
import useFetch from "./useFetch";
import OffCanvasHeader from "./OffCanvasHeader";

const Header = () => {
  const [navLinks, setNavLinks] = useState([]);
  const { user, onLogout, isAdminPage, isAuthenticated } = useAuth();
  const location = useLocation();

  const API_URL = useMemo(
    () => process.env.REACT_APP_BACKEND_URL || "http://localhost:8000",
    []
  );

  const { data: visibleSections } = useFetch(
    `${API_URL}/api/sectionVisibility/visible`
  );

  const { data: settings } = useFetch(`${API_URL}/api/settings`);

  // const userId = localStorage.getItem("userId");

  const preventRefresh = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    // Update the navLinks based on authentication and admin page status
    if (isAuthenticated && isAdminPage) {
      setNavLinks([
        { to: "/form/dashboard", label: "Dashboard" },
        { to: "/form/manage-sections", label: "Manage Sections" },
        { to: "/form/dynamicSections-form", label: "Create Sections" },
        { to: "/form/settings", label: "Settings" },
        { to: "/form/hero-form", label: "Introduction" },
        { to: "/form/about-form", label: "About" },
        { to: "/form/skills-form", label: "Skills" },
        { to: "/form/service-form", label: "Services" },
        { to: "/form/counter-form", label: "Counter" },
        { to: "/form/portfolio-form", label: "Works" },
        { to: "/form/testimonial-form", label: "Testimonial" },
        { to: "/form/certification-form", label: "Certification" },
        { to: "/form/contact-form", label: "Contact" },
        { to: "/form/social-form", label: "Social Links" },
        { to: "/form/CV-form", label: "Upload CV" },
        { to: "/form/termsandconditions", label: "Terms and Conditions" },
      ]);
    } else if (visibleSections && settings) {
      const updatedNavLinks = [
        { to: "/", label: "Home" },
        ...visibleSections.map((section) => {
          const sectionSettings =
            Object.values(settings).find((s) => s.name === section.name) || {};

          const sectionTitle = sectionSettings.title || section.name;
          // console.log("sectionTitle:", sectionTitle);

          return {
            to: `#${section.name.toLowerCase().replace(/\s+/g, "")}`,
            label: `${sectionTitle ? sectionTitle : section.name}`,
          };
        }),
      ];

      setNavLinks(updatedNavLinks);
    }
  }, [isAuthenticated, isAdminPage, visibleSections, settings]);

  const isActiveLink = (link) => {
    const linkHash = link.split("#")[1] ? `#${link.split("#")[1]}` : null;
    // console.log("Location", location);
    // console.log("link:", link);

    // Check if the location's hash matches the link hash
    return location.hash === linkHash || location.pathname === link;
  };

  return (
    <>
      <header id="header" className="fixed-top">
        <div className="container">
          <HorizontalHeader
            isAuthenticated={isAuthenticated}
            user={user}
            preventRefresh={preventRefresh}
            onLogout={onLogout}
            isAdminPage={isAdminPage}
          />
          <OffCanvasHeader navLinks={navLinks} isActiveLink={isActiveLink} />
        </div>
      </header>
    </>
  );
};

export default Header;
