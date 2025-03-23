export const handleTooltip = () => {
  const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]'
  );

  tooltipTriggerList.forEach((tooltipTriggerEl) => {
    const tooltipInstance = new window.bootstrap.Tooltip(tooltipTriggerEl);

    // Manually hide tooltip when clciking on the link
    tooltipTriggerEl.addEventListener("click", () => {
      tooltipInstance.hide();
    });
  });
};
