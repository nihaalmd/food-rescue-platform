import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import ImpactStats from "../components/ImpactStats";
import "../styles/home.css";

function Home() {
  return (
    <div className="home-page">

      <Navbar />
      <HeroSection />

    </div>
  );
}

export default Home;