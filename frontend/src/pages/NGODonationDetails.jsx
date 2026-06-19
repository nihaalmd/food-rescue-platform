import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/ngo.css";

export default function NGODonationDetails() {

  const { id } = useParams();

  const [donation, setDonation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [acceptConfirm, setAcceptConfirm] =
    useState(false);

  const token = localStorage.getItem(
    "token"
  );

  const fetchDonation = async () => {

    try {

      const response =
        await axios.get(
          `http://localhost:5000/api/donations/${id}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setDonation(
        response.data.donation
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
    fetchDonation();
  }, [id]);

  const handleAcceptDonation =
    async () => {

      try {

        await axios.put(
          `http://localhost:5000/api/donations/accept/${id}`,
          {},
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        setAcceptConfirm(false);

        fetchDonation();

      } catch (error) {

        console.log(error);

        alert(
          error.response?.data
            ?.message ||
          "Failed to accept donation"
        );

      }

    };

  return (
    <div className="ngo-page">

      <Navbar />

      <div className="ngo-content">

        <h1>
          Donation Details
        </h1>

        {loading && (
          <p>
            Loading donation...
          </p>
        )}

        {!loading &&
          !donation && (
            <p>
              Donation not found.
            </p>
          )}

        {donation && (

          <div className="donation-details">

            <div className="card donation-main">

              {donation.image && (
                <img
                  src={`http://localhost:5000${donation.image}`}
                  alt={donation.foodName}
                  className="donation-image"
                />
              )}

              <h2>{donation.foodName}</h2>

              <div className="donation-meta">
                <div className="meta-item"><strong>Quantity:</strong> {donation.quantity}</div>
                <div className="meta-item"><strong>Food Type:</strong> {donation.foodType}</div>
                <div className="meta-item"><strong>Expiry:</strong> {new Date(donation.expiryTime).toLocaleString()}</div>
              </div>

              <p style={{ marginTop: 12 }}><strong>Description:</strong> {donation.description}</p>

            </div>

            <div className="card donation-side">

              <p><strong>Restaurant:</strong> {donation.restaurant?.name}</p>

              <p><strong>Email:</strong> {donation.restaurant?.email}</p>

              <p><strong>Address:</strong> {donation.pickupAddress}</p>

              <p><strong>Status:</strong> {donation.status}</p>

              {donation.status === 'available' && (
                <div className="ngo-actions-row">
                  <button
                    onClick={() => setAcceptConfirm(true)}
                    className="primary-btn"
                  >
                    Accept Donation
                  </button>
                </div>
              )}

            </div>

          </div>

        )}

        <div
          style={{
            marginTop: "20px",
          }}
        >

          <Link to="/ngo/feed">
            Back to Feed
          </Link>

        </div>

        {acceptConfirm && (

          <div className="modal-overlay">

            <div className="modal">

              <h3>
                Accept Donation?
              </h3>

              <p>
                Are you sure
                you want to
                accept{" "}
                <strong>
                  {
                    donation.foodName
                  }
                </strong>
                ?
              </p>

              <div className="modal-actions">

                <button
                  className="btn"
                  onClick={() =>
                    setAcceptConfirm(
                      false
                    )
                  }
                >
                  Cancel
                </button>

                <button
                  className="btn primary"
                  onClick={
                    handleAcceptDonation
                  }
                >
                  Accept
                </button>

              </div>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}