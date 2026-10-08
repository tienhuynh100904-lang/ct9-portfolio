import { Grain, ScrollProgress } from "@/components/effects/Ambient";
import { CustomCursor } from "@/components/effects/CustomCursor";
import { Preloader } from "@/components/effects/Preloader";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Journey } from "@/components/sections/Journey";
import { Navbar } from "@/components/sections/Navbar";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { TechMarquee } from "@/components/sections/TechMarquee";

export default function Home() {
  return (
    <>
      <Preloader />
      <CustomCursor />
      <ScrollProgress />
      <Grain />
      <Navbar />
      <main>
        <Hero />
        <TechMarquee />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
