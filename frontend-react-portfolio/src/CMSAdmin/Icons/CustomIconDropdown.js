import { useState, useEffect, useMemo } from "react";
import debounce from "lodash.debounce";

const CustomIconDropdown = ({
  selectedIcon,
  setSelectedIcon,
  register,
  setValue,
  errors,
  name,
}) => {
  const [icons, setIcons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Fetch icons only once on component mount
  useEffect(() => {
    fetch("/assets/data/icons.json")
      .then((response) => response.json())
      .then((data) => setIcons(data))
      .catch((error) => console.error("Error loading icons:", error));
  }, []);

  const handleIconSelect = (icon) => {
    setSelectedIcon(icon.className);
    setValue(name, icon.className);
    setDropdownOpen(false); // Close dropdown after selection
  };

  // Debounced search input to optimize performance
  const handleSearchChange = debounce((event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    setDropdownOpen(term.length > 0); // Open dropdown if there's a search term
  }, 300);

  const filteredIcons = useMemo(
    () =>
      icons.filter((icon) => icon.className.toLowerCase().includes(searchTerm)),
    [icons, searchTerm]
  );

  return (
    <div className="form-group">
      <div className="custom-dropdown">
        {/* Persistent search input */}
        <input
          type="text"
          placeholder="Search icon..."
          onChange={handleSearchChange}
          className="search-input"
        />

        {/* Show dropdown only if open and there are filtered results */}
        {dropdownOpen && filteredIcons.length > 0 && (
          <ul className="dropdown-menu">
            {filteredIcons.map((icon, index) => (
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
                  loading="lazy"
                />
              </li>
            ))}
          </ul>
        )}
      </div>
      <input
        type="hidden"
        name={name}
        value={selectedIcon}
        {...register(name)}
      />
      {errors[name] && <p className="error-message">{errors[name]?.message}</p>}
    </div>
  );
};

export default CustomIconDropdown;
