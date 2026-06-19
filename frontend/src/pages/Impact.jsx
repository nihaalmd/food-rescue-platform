import Navbar from "../components/Navbar";
import ImpactStats from "../components/ImpactStats";
import "../styles/home.css";

function ImpactPage() {
  return (
    <div className="home-page">
      <Navbar />
      <ImpactStats />
    </div>
  );
}

export default ImpactPage;
