import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { Shop } from "./components/Shop";
import { Mindfulness } from "./components/Mindfulness";
import { Games } from "./components/Games";
import { Support } from "./components/Support";
import { About } from "./components/About";
import { Footer } from "./components/Footer";
import { Research } from "./components/Research";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CandyMatchPage from "./pages/games/CandyMatchPage";
import HealAvatarPage from "./pages/games/HealAvatarPage";
import WordPuzzlePage from "./pages/games/WordPuzzlePage";
import MindfulnessPage from "./pages/MindfulnessPage";
import VideoCallPage from "./pages/support/VideoCallPage";
import ShopPage from "./pages/shop/ShopPage";
import PeerGroupRoom from "./pages/support/PeerGroupRoom";
import PeerQuickCall from "./pages/support/PeerQuickCall";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/games/candy-match" element={<CandyMatchPage />} />
          <Route path="/games/heal-avatar" element={<HealAvatarPage />} />
          <Route path="/games/word-puzzle" element={<WordPuzzlePage />} />
          <Route path="/mindfulness" element={<MindfulnessPage />} />
          <Route path="/support/video-call" element={<VideoCallPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/support/peer/:roomId" element={<PeerGroupRoom />} />
          <Route path="/support/peer/anxiety" element={<PeerGroupRoom />} />
          <Route path="/support/peer/mindful-living" element={<PeerGroupRoom />} />
          <Route path="/support/peer/stress-management" element={<PeerGroupRoom />} />
          <Route path="/support/peer/young-adults" element={<PeerGroupRoom />} />
          <Route path="/support/peer-quick/:roomId" element={<PeerQuickCall />} />
          <Route path="/support/peer-quick/anxiety" element={<PeerQuickCall />} />
          <Route path="/support/peer-quick/mindful-living" element={<PeerQuickCall />} />
          <Route path="/support/peer-quick/stress-management" element={<PeerQuickCall />} />
          <Route path="/support/peer-quick/young-adults" element={<PeerQuickCall />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

function Home() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <Features />
      <Research />
      <Shop />
      <Mindfulness />
      <Games />
      <Support />
      <About />
      <Footer />
      
    </div>
  );
}
