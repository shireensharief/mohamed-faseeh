import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Work from "@/components/Work";
import Experience from "@/components/Experience";
import Moments from "@/components/Moments";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Motion from "@/components/Motion";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <div className="scroll-progress" aria-hidden="true" />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Work />
        <Experience />
        <Moments />
        <Contact />
      </main>
      <Footer />
      <Motion />
    </>
  );
}
