export async function initWow(): Promise<void> {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  const WOWLib = await import("wowjs");
  const WOW = WOWLib.WOW;

  setTimeout(() => {
    const isAnimate = document.body.classList.contains("appear-animate");

    if (isAnimate) {
      document.querySelectorAll<HTMLElement>(".wow").forEach((el) => {
        el.classList.add("no-animate");
      });
    }

    const wow = new WOW({
      boxClass: "wow",
      animateClass: "animatedfgfg",
      offset: 100,
      live: false,
      callback: (box: HTMLElement) => {
        box.classList.add("animated");
      },
    });

    if (isAnimate) {
      wow.init();
    } else {
      document.querySelectorAll<HTMLElement>(".wow").forEach((el) => {
        el.style.opacity = "1";
      });
    }

    if (isAnimate) {
      document.querySelectorAll<HTMLElement>(".wow-p").forEach((el) => {
        el.classList.add("no-animate");
      });
    }

    const wowP = new WOW({
      boxClass: "wow-p",
      animateClass: "animatedfgfg",
      offset: 100,
      live: false,
      callback: (box: HTMLElement) => {
        box.classList.add("animated");
      },
    });

    if (isAnimate) {
      wowP.init();
    } else {
      document.querySelectorAll<HTMLElement>(".wow-p").forEach((el) => {
        el.style.opacity = "1";
      });
    }

    if (
      isAnimate &&
      window.innerWidth >= 1024 &&
      document.documentElement.classList.contains("no-mobile")
    ) {
      document.querySelectorAll<HTMLElement>(".wow-menubar").forEach((el) => {
        el.classList.add("no-animate", "fadeInDown", "animated");
        setInterval(() => {
          el.classList.remove("no-animate");
        }, 1500);
      });
    } else {
      document.querySelectorAll<HTMLElement>(".wow-menubar").forEach((el) => {
        el.style.opacity = "1";
      });
    }
  }, 400);
}
