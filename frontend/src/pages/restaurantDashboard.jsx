import "../styles/restaurantDashboard.css";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import EditDonationModal from "../components/EditDonationModal";

function RestaurantDashboard() {

  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editing, setEditing] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const token = localStorage.getItem("token");

  const fetchDonations = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/donations/my-donations",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDonations(response.data.donations);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const dashboardStats = useMemo(() => {

    return {

      uploads: donations.length,

      active: donations.filter(
        d => d.status === "available"
      ).length,

      claimed: donations.filter(
        d => d.status === "claimed"
      ).length,

      expiring: donations.filter((d) => {

        const expiry =
          new Date(d.expiryTime);

        const now = new Date();

        const minutes =
          (expiry - now) /
          1000 /
          60;

        return (
          minutes > 0 &&
          minutes <= 60
        );

      }).length,

    };

  }, [donations]);

  const handleDelete = (donation) => {
    setDeleteConfirm(donation);
  };

  const confirmDelete = async () => {

    try {

      await axios.delete(
        `http://localhost:5000/api/donations/delete/${deleteConfirm._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDeleteConfirm(null);

      fetchDonations();

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Delete failed"
      );

    }

  };

  const handleSaveEdit = async (
    updatedData
  ) => {

    try {

      await axios.put(
        `http://localhost:5000/api/donations/update/${editing._id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEditing(null);

      fetchDonations();

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Update failed"
      );

    }

  };

  return (
    <>
      <Navbar />

      <div className="restaurant-dashboard">

        <div className="dashboard-content-wrapper">

          <div className="dashboard-header">

            <div>
              <h1>
                Restaurant Dashboard
              </h1>
            </div>

            <div className="header-actions">

              <Link
                to="/restaurant/upload"
                className="upload-btn"
              >
                + Upload Donation
              </Link>

            </div>

          </div>

          {loading && (
            <p>Loading...</p>
          )}

          {!loading && (

            <>
              <div className="dashboard-stats-container">

                <div className="dashboard-stat-card">
                  <h2>
                    {dashboardStats.uploads}
                  </h2>
                  <p>Total Uploads</p>
                </div>

                <div className="dashboard-stat-card">
                  <h2>
                    {dashboardStats.active}
                  </h2>
                  <p>Available</p>
                </div>

                <div className="dashboard-stat-card">
                  <h2>
                    {dashboardStats.claimed}
                  </h2>
                  <p>Claimed</p>
                </div>

                <div className="dashboard-stat-card">
                  <h2>
                    {dashboardStats.expiring}
                  </h2>
                  <p>Expiring Soon</p>
                </div>

              </div>

              <div className="donation-feed">

                <h2>
                  My Donations
                </h2>

                <div className="donation-cards">

                  {donations.map(
                    (donation) => (

                      <div
                        className="donation-card"
                        key={donation._id}
                      >

                        {donation.image && (

                          <img
                            src={`http://localhost:5000${donation.image}`}
                            alt={donation.foodName}
                            style={{
                              width: "100%",
                              height: "180px",
                              objectFit: "cover",
                              borderRadius: "10px",
                              marginBottom: "10px",
                            }}
                          />

                        )}

                        <div className="donation-top">

                          <h3>
                            {
                              donation.foodName
                            }
                          </h3>

                          <span
                            className={`status ${donation.status}`}
                          >
                            {
                              donation.status
                            }
                          </span>

                        </div>

                        <p>
                          Quantity:{" "}
                          {
                            donation.quantity
                          }
                        </p>

                        <p>
                          Food Type:{" "}
                          {
                            donation.foodType
                          }
                        </p>

                        <p>
                          Address:{" "}
                          {
                            donation.pickupAddress
                          }
                        </p>

                        <p>
                          Expiry:
                        </p>

                        <small>
                          {new Date(
                            donation.expiryTime
                          ).toLocaleString()}
                        </small>

                        <p
                          className="donation-actions"
                        >

                          <button
                            onClick={() =>
                              setEditing(
                                donation
                              )
                            }
                            className="action-btn"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(
                                donation
                              )
                            }
                            className="action-btn danger"
                          >
                            Delete
                          </button>

                          <Link
                            to={`/restaurant/donation/${donation._id}`}
                            className="action-link"
                          >
                            Details
                          </Link>

                        </p>

                      </div>

                    )
                  )}

                </div>

              </div>

            </>
          )}

        </div>

        {editing && (

          <EditDonationModal
            donation={editing}
            onCancel={() =>
              setEditing(null)
            }
            onSave={handleSaveEdit}
          />

        )}

        {deleteConfirm && (

          <div className="modal-overlay">

            <div className="modal">

              <h3>
                Delete Donation?
              </h3>

              <p>

                Are you sure you want
                to delete{" "}

                <strong>
                  {
                    deleteConfirm.foodName
                  }
                </strong>

                ?

              </p>

              <div className="modal-actions">

                <button
                  className="btn"
                  onClick={() =>
                    setDeleteConfirm(
                      null
                    )
                  }
                >
                  Cancel
                </button>

                <button
                  className="btn danger"
                  onClick={
                    confirmDelete
                  }
                >
                  Delete
                </button>

              </div>

            </div>

          </div>

        )}

      </div>
    </>
  );
}

export default RestaurantDashboard;