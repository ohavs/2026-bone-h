import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Projects />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
