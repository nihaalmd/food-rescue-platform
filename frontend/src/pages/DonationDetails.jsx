import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function DonationDetails() {

  const { id } = useParams();

  const [donation, setDonation] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const token =
    localStorage.getItem("token");

  useEffect(() => {

    const fetchDonation =
      async () => {

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

    fetchDonation();

  }, [id]);

  return (
    <div className="donation-details-page">

      <Navbar />

      <div className="page-content">

        <h1>Donation Details</h1>

        {loading && (
          <p>Loading...</p>
        )}

        {!loading &&
          !donation && (
            <p>
              Donation not found.
            </p>
          )}

        {donation && (

          <div className="donation-details-card">

            {donation.image && (

              <img
                src={`http://localhost:5000${donation.image}`}
                alt={donation.foodName}
                style={{
                  width: "100%",
                  maxWidth: "500px",
                  borderRadius: "10px",
                  marginBottom: "15px",
                }}
              />

            )}

            <h2>
              {donation.foodName}
            </h2>

            <p>
              <strong>
                Quantity:
              </strong>{" "}
              {donation.quantity}
            </p>

            <p>
              <strong>
                Food Type:
              </strong>{" "}
              {donation.foodType}
            </p>

            <p>
              <strong>
                Status:
              </strong>{" "}
              {donation.status}
            </p>

            <p>
              <strong>
                Address:
              </strong>{" "}
              {donation.pickupAddress}
            </p>

            <p>
              <strong>
                Expiry:
              </strong>{" "}
              {new Date(
                donation.expiryTime
              ).toLocaleString()}
            </p>

            <p>
              <strong>
                Description:
              </strong>{" "}
              {donation.description}
            </p>

          </div>

        )}

        <div
          style={{
            marginTop: "20px",
          }}
        >

          <Link
            to="/restaurant/dashboard"
          >
            Back to Dashboard
          </Link>

        </div>

      </div>

    </div>
  );
}