import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../styles/ngo.css";

export default function PickupLocation() {

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

  if (loading) {

    return (
      <>
        <Navbar />
        <div className="ngo-page">
          <div className="ngo-content">
            <h1>
              Loading...
            </h1>
          </div>
        </div>
      </>
    );

  }

  if (!donation) {

    return (
      <>
        <Navbar />
        <div className="ngo-page">
          <div className="ngo-content">
            <h1>
              Donation not found
            </h1>
          </div>
        </div>
      </>
    );

  }

  const mapUrl =
    `https://maps.google.com/maps?q=${encodeURIComponent(
      donation.pickupAddress
    )}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  const openGoogleMaps =
    () => {

      window.open(
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          donation.pickupAddress
        )}`,
        "_blank"
      );

    };

  return (
    <>
      <Navbar />

      <div className="ngo-page">

        <div className="ngo-content">

          <h1>
            Pickup Location
          </h1>

          <div
            className="ngo-donation-card"
          >

            <h2>
              {donation.foodName}
            </h2>

            <p>
                <strong>
                    Restaurant:
                </strong>{" "}
                {donation.placeName}
            </p>

            <p>
              <strong>
                Address:
              </strong>{" "}
              {
                donation.pickupAddress
              }
            </p>

            <p>
              <strong>
                Quantity:
              </strong>{" "}
              {
                donation.quantity
              }
            </p>

            <iframe
              title="pickup-map"
              src={mapUrl}
              width="100%"
              height="450"
              style={{
                border: 0,
                borderRadius:
                  "16px",
                marginTop:
                  "20px",
              }}
              loading="lazy"
            />

            <div
              className="ngo-actions-row"
            >

              <button
                className="primary-btn"
                onClick={
                  openGoogleMaps
                }
              >
                Open In Google Maps
              </button>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}