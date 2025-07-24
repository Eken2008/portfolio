import Header from "./Header";
import Skills from "./Skills";
import Projects from "./Projects";
import About from "./About";
import { Contact } from "./Contact";
import Footer from "./Footer";

export default function Home() {
  return (
    <>
      <Header></Header>
      <main>
        <About />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
