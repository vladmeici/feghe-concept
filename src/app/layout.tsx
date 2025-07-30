// app/layout.tsx
// NO "use client" directive here!

import {
  DM_Sans,
  Roboto,
  Epilogue,
  Poppins,
  Inter,
  Plus_Jakarta_Sans,
} from "next/font/google";

// Import CSS here first, then Bootstrap, then your custom CSS
// This order helps your custom styles override Bootstrap

import "../../public/assets/css/globals.css"; // Bootstrap first
// import "../../public/assets/css/bootstrap.min.css"; // Bootstrap first
// import "../../public/assets/css/style.css"; // Your main custom style
// import "../../public/assets/css/vertical-rhythm.min.css";
// import "../../public/assets/css/magnific-popup.css";
// import "../../public/assets/css/owl.carousel.css";
// import "../../public/assets/css/splitting.css";
// import "../../public/assets/css/YTPlayer.css";
// import "../../public/assets/css/demo-main/demo-main.css";
// import "../../public/assets/css/demo-bold/demo-bold.css";
// import "../../public/assets/css/demo-brutalist/demo-brutalist.css";
// import "../../public/assets/css/demo-corporate/demo-corporate.css";
// import "../../public/assets/css/demo-elegant/demo-elegant.css";
// import "../../public/assets/css/demo-fancy/demo-fancy.css";
// import "../../public/assets/css/demo-gradient/demo-gradient.css";
// import "../../public/assets/css/demo-modern/demo-modern.css";
// import "../../public/assets/css/demo-slick/demo-slick.css";
// import "../../public/assets/css/demo-strong/demo-strong.css";
// import "../../public/assets/css/custom.css";
// import "../../public/assets/css/style-responsive.css";

// Import any other global CSS that doesn't rely on client-side JS
// import "swiper/css"; // Swiper CSS is fine here
// import "swiper/css/effect-fade";
// import "photoswipe/dist/photoswipe.css";
// import "jarallax/dist/jarallax.min.css"; // Jarallax CSS also fine here
// import "tippy.js/dist/tippy.css"; // Tippy CSS too

// Import the client-side wrapper
import Providers from "@/app/Providers";

const dmSans = DM_Sans({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

const roboto = Roboto({
  weight: ["400", "500"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

const epilogue = Epilogue({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-epilogue",
});

const poppins = Poppins({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plus-jakarta-sans",
});

const appFonts = {
  dmSans,
  roboto,
  epilogue,
  poppins,
  inter,
  plusJakartaSans,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const allFontClassNames = `${appFonts.dmSans.variable} ${appFonts.roboto.variable} ${appFonts.epilogue.variable} ${appFonts.poppins.variable} ${appFonts.inter.variable} ${appFonts.plusJakartaSans.variable}`;

  return (
    <html lang="en" className={`no-mobile no-touch ${allFontClassNames}`}>
      <body className="appear-animate body">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
