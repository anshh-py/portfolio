import { useState } from "react";
import Navbar from "./components/Navbar";
import SnakeGame from "./components/SnakeGame";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Research from "./components/Research";
import Skills from "./components/Skills";
import Approach from "./components/Approach";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AskAnsh from "./components/AskAnsh";
import { BackToTop, ScrollProgress } from "./components/ScrollWidgets";

export default function App() {
  const [gameMode, setGameMode] = useState(false);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-accent focus:px-4 focus:py-2 focus:text-white focus:rounded"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <Navbar gameMode={gameMode} onToggleGameMode={() => setGameMode((v) => !v)} />
      {gameMode && <SnakeGame />}
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Research />
        <Skills />
        <Approach />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <AskAnsh />
    </>
  );
}
