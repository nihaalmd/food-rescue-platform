import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function DonationStatus() {

  const { id } = useParams();

  const [donation, setDonation] =
    useState(null);

  const token =
    localStorage.getItem("token");

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

      }

    };

  useEffect(() => {
    fetchDonation();
  }, [id]);

  return (
    <div>

      <Navbar />

      <div className="page-content">

        <h1>Donation Status</h1>

        {!donation ? (

          <p>Loading...</p>

        ) : (

          <div className="donation-status-card">

            <h2>
              {donation.foodName}
            </h2>

            <p>
              <strong>
                Current Status:
              </strong>{" "}
              {donation.status}
            </p>

            <p>
              <strong>
                Quantity:
              </strong>{" "}
              {donation.quantity}
            </p>

            <p>
              <strong>
                Claimed By:
              </strong>{" "}
              {
                donation.claimedBy?.name ||
                "Not Claimed"
              }
            </p>

          </div>

        )}

        <div
          style={{
            marginTop: "15px",
          }}
        >

          <Link
            to="/restaurant/dashboard"
          >
            Back
          </Link>

        </div>

      </div>

    </div>
  );
}