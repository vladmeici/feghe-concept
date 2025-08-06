// components/Providers.tsx
"use client"; // This component is client-side

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

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
    import("@/utils/initWowjs").then((mod) => {
      mod.initWow();
    });
  }, []);

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

  return (
    <>
      <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
    </>
  );
}
