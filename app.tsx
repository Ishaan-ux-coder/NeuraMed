import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { Shop } from "./components/Shop";
import { Mindfulness } from "./components/Mindfulness";
import { Games } from "./components/Games";
import { Support } from "./components/Support";
import { About } from "./components/About";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <Features />
      <Shop />
      <Mindfulness />
      <Games />
      <Support />
      <About />
      <Footer />
    </div>
  );
}
