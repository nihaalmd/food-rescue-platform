import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../styles/ngo.css";

export default function NGODonationsFeed() {
  const [donations, setDonations] = useState([]);
  const [acceptConfirm, setAcceptConfirm] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchDonations = async () => {
    try {

      const response = await axios.get(
        "http://localhost:5000/api/donations/all",
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

  const acceptDonation = async () => {
    try {

      await axios.put(
        `http://localhost:5000/api/donations/accept/${acceptConfirm._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAcceptConfirm(null);

      fetchDonations();

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to accept donation"
      );

    }
  };

  return (
    <>
      <Navbar />
    <div className="ngo-page">

      <div className="ngo-content">

        <h1>Live Donation Feed</h1>

        <p className="muted">
          Browse available rescues and claim ones you can pick up.
        </p>

        {loading && (
          <p>Loading donations...</p>
        )}

        {!loading && donations.length === 0 && (
          <p>No available donations right now.</p>
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

                <h3>{donation.foodName}</h3>

                <span className="status">
                  {donation.status}
                </span>

              </div>

              <p>
                <strong>Quantity:</strong>{" "}
                {donation.quantity}
              </p>

              <p>
                <strong>Food Type:</strong>{" "}
                {donation.foodType}
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
                <strong>Expiry:</strong>{" "}
                {new Date(
                  donation.expiryTime
                ).toLocaleString()}
              </p>

              <p>
                <strong>Description:</strong>{" "}
                {donation.description}
              </p>

              <div className="ngo-actions-row">

                <button
                  className="primary-btn"
                  onClick={() =>
                    setAcceptConfirm(donation)
                  }
                >
                  Accept Donation
                </button>

              </div>

            </div>

          ))}

        </div>

        {acceptConfirm && (

          <div className="modal-overlay">

            <div className="modal">

              <h3>
                Accept donation?
              </h3>

              <p>
                Are you sure you want to
                accept{" "}
                <strong>
                  {acceptConfirm.foodName}
                </strong>
                ?
              </p>

              <div className="modal-actions">

                <button
                  className="btn"
                  onClick={() =>
                    setAcceptConfirm(null)
                  }
                >
                  Cancel
                </button>

                <button
                  className="btn primary"
                  onClick={acceptDonation}
                >
                  Accept
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