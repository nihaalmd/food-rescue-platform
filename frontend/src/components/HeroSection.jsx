import { FaUtensils, FaHandsHelping, FaBiking, FaUtensilSpoon, FaPaste, FaPizzaSlice, FaLock, FaMapMarker, FaMapMarkerAlt, FaCamera, FaCameraRetro, FaUserLock, FaRegClock, FaUnlock } from "react-icons/fa";
import "../styles/hero.css";

function HeroSection() {
return (
<> 

<section className="hero">


    <div className="hero-left">

      <p className="hero-tag">
        REAL-TIME FOOD RESCUE PLATFORM
      </p>

      <h1>
        Rescuing Surplus Food.
        <br />
        Feeding Communities.
      </h1>

      <p className="hero-description">
        Connecting restaurants, NGOs, and volunteers
        to reduce food waste and deliver meals where
        they are needed most.
      </p>

      <div className="hero-buttons">

        <button className="primary-btn">
          Donate Food
        </button>

        <button className="secondary-btn">
          Become Volunteer
        </button>

      </div>

    </div>

    <div className="hero-right">
      <div className="features">

        <div className="feature-card">
          <div className="feature-emoji">
            <FaUtensils />
          </div>

          <div>
            <h4>For Restaurants</h4>
            <p>
              Quickly list surplus meals and connect
              with nearby NGOs and volunteers for
              fast pickups.
            </p>
          </div>
        </div>

        <div className="feature-card">
          <div className="feature-emoji">
            <FaHandsHelping />
          </div>

          <div>
            <h4>For NGOs</h4>
            <p>
              Receive timely notifications,
              coordinate collections, and reach
              communities in need.
            </p>
          </div>
        </div>

        <div className="feature-card">
          <div className="feature-emoji">
            <FaBiking />
          </div>

          <div>
            <h4>For Volunteers</h4>
            <p>
              See nearby opportunities, sign up for
              pickups, and help reduce waste while
              feeding people.
            </p>
          </div>
        </div>

      </div>
    </div>

  </section>

  <section className="hero-stats-section">

    <div className="hero-stat-card">
      <h2>12,450+</h2>
      <p>Meals Rescued</p>
    </div>

    <div className="hero-stat-card">
      <h2>320+</h2>
      <p>NGOs Connected</p>
    </div>

    <div className="hero-stat-card">
      <h2>850+</h2>
      <p>Volunteers Active</p>
    </div>

    <div className="hero-stat-card">
      <h2>5 Tons</h2>
      <p>Food Waste Reduced</p>
    </div>

  </section>

  <section className="hero-info-section">

    <div className="hero-section-header">
      <h2>Why FeedForward?</h2>

      <p>
        FeedForward helps bridge the gap between
        food surplus and food insecurity by
        connecting restaurants, NGOs, and
        volunteers through a single platform.
      </p>
    </div>

    <div className="hero-info-grid">

      <div className="feature-card">
        <div className="feature-emoji">
          <FaPizzaSlice />
        </div>

        <div>
          <h4>Reduce Food Waste</h4>

          <p>
            Redirect surplus food to communities
            instead of allowing it to go to waste.
          </p>
        </div>
      </div>

      <div className="feature-card">
        <div className="feature-emoji">
          <FaHandsHelping />
        </div>

        <div>
          <h4>Connect Communities</h4>

          <p>
            Strengthen collaboration between
            restaurants, NGOs and volunteers.
          </p>
        </div>
      </div>

      <div className="feature-card">
        <div className="feature-emoji">
          <FaUtensils />
        </div>

        <div>
          <h4>Feed More People</h4>

          <p>
            Ensure nutritious food reaches
            people who need it most.
          </p>
        </div>
      </div>

    </div>

  </section>

  <section className="hero-process-section">

    <div className="hero-section-header">
      <h2>How FeedForward Works</h2>
    </div>

    <div className="hero-process-grid">

      <div className="feature-card">
        <h4>1️⃣ Restaurant Uploads Food</h4>

        <p>
          Restaurants create donations by adding
          food details, quantity and location.
        </p>
      </div>

      <div className="feature-card">
        <h4>2️⃣ NGO Discovers Donation</h4>

        <p>
          NGOs browse available donations from
          their dashboard.
        </p>
      </div>

      <div className="feature-card">
        <h4>3️⃣ Donation Is Claimed</h4>

        <p>
          A donation is claimed and marked to
          avoid duplicate requests.
        </p>
      </div>

      <div className="feature-card">
        <h4>4️⃣ Food Reaches Communities</h4>

        <p>
          The donated food is collected and
          distributed where it is needed.
        </p>
      </div>

    </div>

  </section>

  <section className="hero-platform-section">

    <div className="hero-section-header">
      <h2>Platform Features</h2>
    </div>

    <div className="hero-info-grid">

      <div className="feature-card">
        <div className="feature-emoji">
          <FaUserLock />
        </div>

        <div>
          <h4>Secure Authentication</h4>

          <p>
            JWT based authentication with role
            based access control.
          </p>
        </div>
      </div>

      <div className="feature-card">
        <div className="feature-emoji">
          <FaMapMarkerAlt/>
        </div>

        <div>
          <h4>Location Services</h4>

          <p>
            Google Maps integration helps NGOs
            locate food donations efficiently.
          </p>
        </div>
      </div>

      <div className="feature-card">
        <div className="feature-emoji">
          <FaCameraRetro/>  
        </div>

        <div>
          <h4>Image Uploads</h4>

          <p>
            Restaurants can upload images of
            available food before donation.
          </p>
        </div>
      </div>

    </div>

  </section>

  <section className="hero-cta-section">

    <h2>
      Ready to Make a Difference?
    </h2>

    <p>
      Join FeedForward and help create a future
      where good food never goes to waste.
    </p>

    <button className="primary-btn">
      Get Started
    </button>

  </section>

</>


);
}

export default HeroSection;
