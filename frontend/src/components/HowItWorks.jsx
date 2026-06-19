import Navbar from "./Navbar";
import "../styles/howitworks.css";

function HowItWorks() {
  return (
    <div className="workflow-page">

      <Navbar />

      <section className="workflow">

        <h1>How FeedForward Works</h1>

        <div className="workflow-cards">

          <div className="workflow-card">

            <h2>1</h2>

            <h3>Upload Surplus Food</h3>

            <p>
              Restaurants and canteens upload surplus food
              details in real time for nearby NGOs.
            </p>

          </div>

          <div className="workflow-card">

            <h2>2</h2>

            <h3>NGOs Get Alerted</h3>

            <p>
              Nearby NGOs receive instant notifications and
              coordinate pickups efficiently.
            </p>

          </div>

          <div className="workflow-card">

            <h2>3</h2>

            <h3>Volunteer Pickup</h3>

            <p>
              Volunteers collect and deliver meals safely
              to communities in need.
            </p>

          </div>

        </div>

      </section>

    </div>
  );
}

export default HowItWorks;