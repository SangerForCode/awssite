import About from "@/components/About";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Leadership from "@/components/Leadership";
import Projects from "@/components/Projects";
import Research from "@/components/Research";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <About />
      <Skills />
      <Leadership />
      <Projects />
      <Research />
      <Footer />
    </main>
  );
}
