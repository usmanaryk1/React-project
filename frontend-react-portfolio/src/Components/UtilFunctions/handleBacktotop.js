// function to add active class fro the back to top toggle button depending on the scroll of the webpage
export const toggleBacktotop = () => {
  const backtotop = document.querySelector(".back-to-top");
  if (backtotop) {
    // if the window scroll is more than 100 than the button should be in active state
    if (window.scrollY > 100) {
      backtotop.classList.add("active");
    } else {
      // but if the window scroll is more than 100 than the button should not be in active state
      backtotop.classList.remove("active");
    }
  }
};

// function to scrolling back to top on click of the back-to-top toggle button
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
