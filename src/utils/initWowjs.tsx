"use client";
import "wowjs/dist/wow.min.js";

export function init_wow(): void {
  setTimeout(() => {
    if (typeof window === "undefined" || !window.WOW) {
      console.warn(
        "WOW.js not available in this environment (likely SSR) or not loaded."
      );
      return;
    }

    const WOWConstructor = window.WOW;

    /* Wow init */
    if (document.body.classList.contains("appear-animate")) {
      document
        .querySelectorAll(".wow")
        .forEach((el) => el.classList.add("no-animate"));
    }

    const wow = new WOWConstructor({
      boxClass: "wow",
      animateClass: "animatedfgfg",
      offset: 100,
      live: false,
      callback: function (box: HTMLElement) {
        box.classList.add("animated");
      },
    });

    if (document.body.classList.contains("appear-animate")) {
      wow.init();
    } else {
      document.querySelectorAll(".wow").forEach((el) => {
        if (el instanceof HTMLElement) {
          el.style.opacity = "1";
        }
      });
    }

    /* Wow for portfolio init */
    if (document.body.classList.contains("appear-animate")) {
      document
        .querySelectorAll(".wow-p")
        .forEach((el) => el.classList.add("no-animate"));
    }
    const wow_p = new WOWConstructor({
      boxClass: "wow-p",
      animateClass: "animatedfgfg",
      offset: 100,
      live: false,
      callback: function (box: HTMLElement) {
        box.classList.add("animated");
      },
    });

    if (document.body.classList.contains("appear-animate")) {
      wow_p.init();
    } else {
      document.querySelectorAll(".wow-p").forEach((el) => {
        if (el instanceof HTMLElement) {
          el.style.opacity = "1";
        }
      });
    }

    /* Wow for menu bar init */
    if (
      document.body.classList.contains("appear-animate") &&
      window.innerWidth >= 1024 &&
      document.documentElement.classList.contains("no-mobile")
    ) {
      document.querySelectorAll(".wow-menubar").forEach((el) => {
        if (el instanceof HTMLElement) {
          el.classList.add("no-animate", "fadeInDown", "animated");
          setTimeout(() => {
            el.classList.remove("no-animate");
          }, 1500);
        }
      });
    } else {
      document.querySelectorAll(".wow-menubar").forEach((el) => {
        if (el instanceof HTMLElement) {
          el.style.opacity = "1";
        }
      });
    }
  }, 400);
}
