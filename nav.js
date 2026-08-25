const navToggle = document.querySelector(".mast-toggle");
const navList = document.getElementById("primary-nav");
if (navToggle && navList) {
  navToggle.addEventListener("click", () => {
    const isOpen = navList.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}
