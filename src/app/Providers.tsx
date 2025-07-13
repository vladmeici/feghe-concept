// components/Providers.tsx
"use client"; // This component is client-side

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// CSS Imports (ONLY CSS that relies on client-side JS for functionality,
// though generally, ALL CSS can be imported in the server layout)
// For now, keep them here, but ideally move to server layout if they don't break.
import "swiper/css";
import "../../public/assets/css/style-responsive.css";
// ... all other CSS imports
import "jarallax/dist/jarallax.min.css";
import "swiper/css/effect-fade";
import "photoswipe/dist/photoswipe.css";
import "tippy.js/dist/tippy.css";

// Utility imports
import { parallaxMouseMovement, parallaxScroll } from "@/utils/parallax";
import { headerChangeOnScroll } from "@/utils/changeHeaderOnScroll";

export default function Providers({ children }: { children: React.ReactNode }) {
  const path = usePathname();

  useEffect(() => {
    parallaxMouseMovement();
    const mainNav = document.querySelector(".main-nav");
    if (mainNav?.classList.contains("transparent")) {
      mainNav.classList.add("js-transparent");
    } else if (!mainNav?.classList?.contains("dark")) {
      mainNav?.classList.add("js-no-transparent-white");
    }

    window.addEventListener("scroll", headerChangeOnScroll);
    parallaxScroll();
    return () => {
      window.removeEventListener("scroll", headerChangeOnScroll);
    };
  }, [path]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("bootstrap/dist/js/bootstrap.esm").then(() => {});
    }
  }, []);

  useEffect(() => {
    const initializeWow = async () => {
      if (typeof window !== "undefined") {
        const WOW = (await import("wowjs")).WOW;

        /* Wow init */
        if (document.body.classList.contains("appear-animate")) {
          document
            .querySelectorAll(".wow")
            .forEach((el) => el.classList.add("no-animate"));
        }

        const wow = new WOW({
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
        const wow_p = new WOW({
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

        new WOW({
          boxClass: "wow",
          animateClass: "animated",
          offset: 0,
          mobile: true,
          live: true,
          callback: function () {},
          scrollContainer: null,
        }).init();
      }
    };
    initializeWow();
  }, []);

  return <>{children}</>;
}
