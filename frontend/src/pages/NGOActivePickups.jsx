import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../styles/ngo.css";

export default function NGOActivePickups() {

  const [donations, setDonations] = useState([]);
  const [confirmAction, setConfirmAction] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchClaims = async () => {
    try {

      const response = await axios.get(
        "http://localhost:5000/api/donations/my-claims",
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
    fetchClaims();
  }, []);

  const startPickup = (donation) => {
    setConfirmAction({
      type: "pickup",
      donation,
    });
  };

  const completePickup = (donation) => {
    setConfirmAction({
      type: "complete",
      donation,
    });
  };

  const handleConfirmAction = async () => {

    try {

      if (
        confirmAction.type === "pickup"
      ) {

        await axios.put(
          `http://localhost:5000/api/donations/pickup/${confirmAction.donation._id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      }

      if (
        confirmAction.type === "complete"
      ) {

        await axios.put(
          `http://localhost:5000/api/donations/complete/${confirmAction.donation._id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      }

      setConfirmAction(null);

      fetchClaims();

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Action failed"
      );

    }

  };

  return (
    <>
      <Navbar />

      <div className="ngo-page">

        <div className="ngo-content">

          <h1>Active Pickups</h1>

          {loading && (
            <p>Loading pickups...</p>
          )}

          {!loading &&
            donations.length === 0 && (
              <p>No active pickups.</p>
            )}

          <div className="donation-list">

            {donations.map((donation) => (

              <div
                key={donation._id}
                className="ngo-donation-card"
              >

                {donation.image && (
                  <img
                    src={`http://localhost:5000${donation.image}`}
                    alt={donation.foodName}
                    className="donation-image"
                  />
                )}

                <div className="ngo-donation-top">

                  <h3>
                    {donation.foodName}
                  </h3>

                  <span
                    className={`status ${donation.status}`}
                  >
                    {donation.status}
                  </span>

                </div>

                <p>
                  <strong>Quantity:</strong>{" "}
                  {donation.quantity}
                </p>

                <p>
                  <strong>Restaurant:</strong>{" "}
                  {donation.restaurant?.name}
                </p>

                <p>
                  <strong>Address:</strong>{" "}
                  {donation.pickupAddress}
                </p>

                <p>
                  <strong>Food Type:</strong>{" "}
                  {donation.foodType}
                </p>

                <p>
                  <strong>Expiry:</strong>{" "}
                  {new Date(
                    donation.expiryTime
                  ).toLocaleString()}
                </p>

                <div className="ngo-actions-row">

                  <Link
                    to={`/ngo/pickup-location/${donation._id}`}
                    className="secondary-btn"
                  >
                    View Location
                  </Link>

                  {donation.status ===
                    "claimed" && (

                    <button
                      className="primary-btn"
                      onClick={() =>
                        startPickup(
                          donation
                        )
                      }
                    >
                      Start Pickup
                    </button>

                  )}

                  {donation.status ===
                    "pickedup" && (

                    <button
                      className="primary-btn"
                      onClick={() =>
                        completePickup(
                          donation
                        )
                      }
                    >
                      Mark Completed
                    </button>

                  )}

                </div>

              </div>

            ))}

          </div>

          {confirmAction && (

            <div className="modal-overlay">

              <div className="modal">

                <h3>

                  {confirmAction.type ===
                  "pickup"
                    ? "Start Pickup?"
                    : "Complete Donation?"}

                </h3>

                <p>

                  {confirmAction.type ===
                  "pickup"
                    ? `Start pickup for ${confirmAction.donation.foodName}?`
                    : `Mark ${confirmAction.donation.foodName} as completed?`}

                </p>

                <div className="modal-actions">

                  <button
                    className="btn"
                    onClick={() =>
                      setConfirmAction(
                        null
                      )
                    }
                  >
                    Cancel
                  </button>

                  <button
                    className="btn primary"
                    onClick={
                      handleConfirmAction
                    }
                  >
                    Confirm
                  </button>

                </div>

              </div>

            </div>

          )}

        </div>

      </div>
    </>
  );
}