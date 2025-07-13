export function init_classic_menu_resize() {
  const mobile_nav = document.querySelector(".mobile-nav");
  const desktop_nav = document.querySelector(".desktop-nav");

  if (mobile_nav) {
    mobile_nav.setAttribute("aria-expanded", "false");
  }

  // Mobile menu max height
  if (document.querySelector(".main-nav")) {
    const desktop_nav_ul = document.querySelector(".desktop-nav > ul");
    const main_nav = document.querySelector(".main-nav");
    if (
      desktop_nav_ul &&
      desktop_nav_ul instanceof HTMLElement &&
      main_nav &&
      main_nav instanceof HTMLElement
    ) {
      desktop_nav_ul.style.maxHeight =
        window.innerHeight - main_nav.offsetHeight - 20 + "px";
    }
  }

  // Mobile menu style toggle
  if (window.innerWidth <= 1024) {
    const main_nav = document.querySelector(".main-nav");
    if (main_nav) {
      main_nav.classList.add("mobile-on");
    }
    if (mobile_nav && !mobile_nav.classList.contains("active")) {
      if (desktop_nav && desktop_nav instanceof HTMLElement) {
        desktop_nav.style.display = "none";
      }
    }
  } else if (window.innerWidth > 1024) {
    const main_nav = document.querySelector(".main-nav");
    if (main_nav) {
      main_nav.classList.remove("mobile-on");
    }

    if (desktop_nav && desktop_nav instanceof HTMLElement) {
      desktop_nav.style.display = "block";
    }
  }
}
