import { useState } from "react";

const CustomIconDropdown = ({
  selectedIcon,
  setSelectedIcon,
  register,
  setValue,
  errors,
  name, // Accept a dynamic name prop
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [icons, setIcons] = useState([]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
    if (!icons.length) {
      // Fetch icons only when the dropdown is opened for the first time
      fetch("/assets/data/icons.json")
        .then((response) => response.json())
        .then((data) => setIcons(data))
        .catch((error) => console.error("Error loading icons:", error));
    }
  };

  const handleIconSelect = (icon) => {
    setSelectedIcon(icon.className);
    setValue(name, icon.className); // Use setValue with dynamic name
    setDropdownOpen(false); // Close dropdown after selection
  };

  const selectedIconObject = icons.find(
    (icon) => icon.className === selectedIcon
  );

  return (
    <div className="form-group">
      <div className="custom-dropdown">
        <button type="button" className="dropdown-btn" onClick={toggleDropdown}>
          {selectedIcon && selectedIconObject ? (
            <>
              <img
                src={selectedIconObject.src}
                alt={selectedIcon}
                style={{ width: "24px", height: "24px", marginRight: "8px" }}
                loading="lazy" // Lazy load the selected icon image
              />
              {selectedIcon.replace("bi-", "")}
            </>
          ) : (
            "Select an icon"
          )}
        </button>
        {dropdownOpen && (
          <ul className="dropdown-menu">
            {icons.map((icon, index) => (
              <li
                key={index}
                className="dropdown-item"
                onClick={() => handleIconSelect(icon)}
              >
                {icon.className.replace("bi-", "")}
                <img
                  src={icon.src}
                  alt={icon.className}
                  style={{ width: "24px", height: "24px", marginLeft: "auto" }}
                  loading="lazy" // Lazy load the icon image
                />
              </li>
            ))}
          </ul>
        )}
      </div>
      <input
        type="hidden"
        name={name} // Use the dynamic name prop here
        value={selectedIcon}
        {...register(name)} // Register the input with dynamic name
      />
      {errors[name] && <p className="error-message">{errors[name]?.message}</p>}
    </div>
  );
};

export default CustomIconDropdown;
