import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function AdminDashboard() {

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {

    const fetchStats = async () => {

      try {

        const response = await axios.get(
          "http://localhost:5000/api/admin/stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStats(response.data.stats);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

    fetchStats();

  }, []);

  return (
    <>
      <Navbar />

      <div className="restaurant-dashboard">

        <div className="dashboard-content-wrapper">

          <div className="dashboard-header">

            <div>

              <h1>
                Admin Dashboard
              </h1>

              <p>
                Manage users, donations and system controls.
              </p>

            </div>

            <div className="header-actions">

              <Link
                to="/admin/users"
                className="upload-btn"
              >
                Manage Users
              </Link>

              <Link
              to="/admin/donations"
              className="reset-btn"
              >
                Manage Donations
                </Link>

                <Link
                  to="/admin/system"
                  className="reset-btn"
                >
                  System Controls
                </Link>

            </div>

          </div>

          {loading && (
            <p>Loading...</p>
          )}

          {!loading && stats && (

            <div className="dashboard-stats-container">

              <div className="dashboard-stat-card">
                <h2>{stats.totalUsers}</h2>
                <p>Total Users</p>
              </div>

              <div className="dashboard-stat-card">
                <h2>{stats.totalRestaurants}</h2>
                <p>Restaurants</p>
              </div>

              <div className="dashboard-stat-card">
                <h2>{stats.totalNGOs}</h2>
                <p>NGOs</p>
              </div>

              <div className="dashboard-stat-card">
                <h2>{stats.totalDonations}</h2>
                <p>Donations</p>
              </div>

              <div className="dashboard-stat-card">
                <h2>{stats.available}</h2>
                <p>Available</p>
              </div>

              <div className="dashboard-stat-card">
                <h2>{stats.claimed}</h2>
                <p>Claimed</p>
              </div>

              <div className="dashboard-stat-card">
                <h2>{stats.pickedup}</h2>
                <p>Picked Up</p>
              </div>

              <div className="dashboard-stat-card">
                <h2>{stats.completed}</h2>
                <p>Completed</p>
              </div>

            </div>

          )}

        </div>

      </div>

    </>
  );
}