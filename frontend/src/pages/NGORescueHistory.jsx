import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../styles/ngo.css";

export default function NGORescueHistory() {

  const [rescues, setRescues] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {

    const fetchRescues = async () => {

      try {

        const response = await axios.get(
          "http://localhost:5000/api/donations/my-claims",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const completedRescues =
          response.data.donations.filter(
            donation =>
              donation.status ===
              "completed"
          );

        setRescues(
          completedRescues
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

    fetchRescues();

  }, []);

  return (
    <div className="ngo-page">

      <Navbar />

      <div className="ngo-content">

        <h1>Rescue History</h1>

        {loading && (
          <p>Loading...</p>
        )}

        {!loading &&
          rescues.length === 0 && (
            <p>
              No completed rescues yet.
            </p>
          )}

        <div className="donation-list single-column">
          {rescues.map((rescue) => (

            <div
              key={rescue._id}
              className="ngo-donation-card"
            >

            {rescue.image && (
              <img
                src={`http://localhost:5000${rescue.image}`}
                alt={rescue.foodName}
                className="donation-image"
              />
            )}

            <div className="ngo-donation-top">

              <h3>
                {rescue.foodName}
              </h3>

              <span className="status completed">
                COMPLETED
              </span>

            </div>

            <p>
              Quantity:{" "}
              {rescue.quantity}
            </p>

            <p>
              Restaurant:{" "}
              {
                rescue.restaurant?.name
              }
            </p>

            <p>
              Address:{" "}
              {
                rescue.pickupAddress
              }
            </p>

            <p>
              Food Type:{" "}
              {rescue.foodType}
            </p>

            <p>
              Expiry:{" "}
              {new Date(
                rescue.expiryTime
              ).toLocaleString()}
            </p>

          </div>

          ))}
        </div>

      </div>

    </div>
  );
}