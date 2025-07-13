export const headerChangeOnScroll = () => {
  const mainNav = document.querySelector(".main-nav");
  const navLogoWrapLogo = document.querySelector(".nav-logo-wrap .logo");
  const lightAfterScroll = document.querySelector(".light-after-scroll");
  if (window.scrollY > 0) {
    if (mainNav) {
      mainNav.classList.remove("transparent");
      mainNav.classList.add("small-height", "body-scrolled");
    }
    if (navLogoWrapLogo) navLogoWrapLogo.classList.add("small-height");
    if (lightAfterScroll) lightAfterScroll.classList.remove("dark");
  } else if (window.scrollY === 0) {
    if (mainNav) {
      mainNav.classList.add("transparent");
      mainNav.classList.remove("small-height", "body-scrolled");
    }
    if (navLogoWrapLogo) navLogoWrapLogo.classList.remove("small-height");
    if (lightAfterScroll) lightAfterScroll.classList.add("dark");
  }
};
