import Image from "next/image";
import Header1Multipage from "@/components/headers/Header1Multipage";
import Hero2 from "@/components/homes/home-1/heroes/Hero2";
import Home1 from "@/components/homes/home-1";
import Footer1 from "@/components/footers/Footer1";
import { menuItems } from "@/data/menu";

export const metadata = {
  title:
    "Preview Page || Resonance &mdash; One & Multi Page React Nextjs Creative Template",
  description:
    "Resonance &mdash; One & Multi Page React Nextjs Creative Template",
};

export default function Home() {
  return (
    <>
      <div className="theme-main">
        <div className="page" id="top">
          <nav className="main-nav transparent stick-fixed wow-menubar ">
            <Header1Multipage links={menuItems} />
          </nav>
          <main id="main">
            <section
              className="home-section bg-gradient-gray-light-1 bg-scroll scrollSpysection"
              id="home"
            >
              <div className="bg-shape-1 wow fadeIn">
                <Image
                  width="1443"
                  height="844"
                  src="/assets/images/bg-shape-1.svg"
                  alt=""
                  className="opacity-05"
                />
              </div>
              <Hero2 />
            </section>
            <Home1 />
          </main>
          <Footer1 />
        </div>{" "}
      </div>
    </>
  );
}
