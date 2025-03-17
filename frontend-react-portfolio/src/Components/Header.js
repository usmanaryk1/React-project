import React, { useEffect, useState } from "react";
import { useAuth } from "../CMSAdmin/Auth/AuthContext";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import { handleDownloadCV } from "./UtilFunctions/handleDownloadCV";
import OffCanvasHeader from "./OffCanvasHeader";
import HorizontalHeader from "./HorizontalHeader";

const Header = () => {
  const [navLinks, setNavLinks] = useState([]);
  const { user, onLogout, isAdminPage, isAuthenticated } = useAuth();
  const location = useLocation();
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
    } else {
      setNavLinks([
        { to: "/", label: "Home" },
        { to: "#about", label: "About" },
        { to: "#services", label: "Services" },
        { to: "#work", label: "Work" },
        { to: "#certifications", label: "Certifications" },
        // { to: "/#contact", label: "Contact" },
      ]);
    }
  }, [isAuthenticated, isAdminPage]);

  const isActiveLink = (link) => {
    const linkHash = link.split("#")[1] ? `#${link.split("#")[1]}` : null;
    // console.log("Location", location);
    // console.log("link:", link);

    // Check if the location's hash matches the link hash
    return location.hash === linkHash || location.pathname === link;
  };

  return (
    <>
      {isAdminPage && isAuthenticated ? (
        <OffCanvasHeader
          navLinks={navLinks}
          isActiveLink={isActiveLink}
          isAuthenticated={isAuthenticated}
          user={user}
          onLogout={onLogout}
          preventRefresh={preventRefresh}
          isAdminPage={isAdminPage}
        />
      ) : (
        <HorizontalHeader
          navLinks={navLinks}
          isActiveLink={isActiveLink}
          isAuthenticated={isAuthenticated}
          user={user}
          preventRefresh={preventRefresh}
          onLogout={onLogout}
          isAdminPage={isAdminPage}
          handleDownloadCV={handleDownloadCV}
        />
      )}
    </>
  );
};

export default Header;
