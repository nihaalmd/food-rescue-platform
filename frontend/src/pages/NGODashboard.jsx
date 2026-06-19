import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/ngo.css";

export default function NGODashboard() {

  const [availableDonations, setAvailableDonations] = useState([]);
  const [claimedDonations, setClaimedDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {

    const fetchData = async () => {

      try {

        const [availableRes, claimedRes] =
          await Promise.all([

            axios.get(
              "http://localhost:5000/api/donations/all",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            ),

            axios.get(
              "http://localhost:5000/api/donations/my-claims",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            ),

          ]);

        setAvailableDonations(
          availableRes.data.donations
        );

        setClaimedDonations(
          claimedRes.data.donations
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

    fetchData();

  }, []);

  const stats = useMemo(() => {

    const available =
      availableDonations.length;

    const claimed =
      claimedDonations.filter(
        d => d.status === "claimed"
      ).length;

    const pickedup =
      claimedDonations.filter(
        d => d.status === "pickedup"
      ).length;

    const completed =
      claimedDonations.filter(
        d => d.status === "completed"
      ).length;

    return {
      available,
      claimed,
      pickedup,
      completed,
    };

  }, [
    availableDonations,
    claimedDonations,
  ]);

  return (
    <>
      <Navbar />

      <div className="restaurant-dashboard">

        <div className="dashboard-content-wrapper">

          <div className="dashboard-header">

            <div>

              <h1>
                NGO Dashboard
              </h1>

              <p>
                Discover, claim and
                manage food donations.
              </p>

            </div>

            <div className="header-actions">
                
                <Link
                  to="/ngo/feed"
                  className="upload-btn"
                >
                  Live Feed
                </Link>
                
                <Link
                  to="/ngo/active"
                  className="reset-btn"
                >
                  Active Pickups
                </Link>
                
                <Link
                  to="/ngo/history"
                  className="reset-btn"
                >
                  Rescue History
                </Link>
                
              </div>

          </div>

          {loading && (
            <p>Loading...</p>
          )}

          {!loading && (

            <div className="dashboard-stats-container">

              <div className="dashboard-stat-card">

                <h2>
                  {stats.available}
                </h2>

                <p>
                  Available Donations
                </p>

              </div>

              <div className="dashboard-stat-card">

                <h2>
                  {stats.claimed}
                </h2>

                <p>
                  Claimed Donations
                </p>

              </div>

              <div className="dashboard-stat-card">

                <h2>
                  {stats.pickedup}
                </h2>

                <p>
                  Pickups In Progress
                </p>

              </div>

              <div className="dashboard-stat-card">

                <h2>
                  {stats.completed}
                </h2>

                <p>
                  Completed Donations
                </p>

              </div>

            </div>

          )}

          <div
            style={{
              marginTop: "30px",
            }}
          >

            <h2>
              Recent Claims
            </h2>

            <div className="donation-list">
              {claimedDonations
                .slice(0, 5)
                .map((donation) => (

                  <div
                    key={donation._id}
                    className="ngo-donation-card"
                    style={{ marginTop: "15px" }}
                  >

                    <h3>{donation.foodName}</h3>

                    <p>Quantity: {donation.quantity}</p>

                    <p>Status: {donation.status}</p>

                    <p>Restaurant: {donation.restaurant?.name}</p>

                  </div>

                ))}
            </div>

          </div>

        </div>

      </div>

    </>
  );
}