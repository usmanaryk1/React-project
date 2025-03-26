import { Offcanvas } from "bootstrap";

export const closeCanvas = () => {
  const offcanvasElement = document.getElementById("offcanvasScrolling");
  const bsOffcanvas = Offcanvas.getInstance(offcanvasElement);
  if (bsOffcanvas) {
    bsOffcanvas.hide(); // Close the offcanvas
  }

  // Ensure the backdrop is removed
  setTimeout(() => {
    const backdrop = document.querySelector(".offcanvas-backdrop");
    if (backdrop) {
      backdrop.remove();
    }
    document.body.classList.remove("offcanvas-open"); // Removes any leftover classes that might be causing dimming
  }, 300); // Delay slightly to allow the transition to complete
};
