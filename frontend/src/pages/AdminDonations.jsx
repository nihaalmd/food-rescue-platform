import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../styles/admin.css";

export default function AdminDonations() {

  const [donations, setDonations] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const token =
    localStorage.getItem("token");

  const fetchDonations =
    async () => {

      try {

        const response =
          await axios.get(
            "http://localhost:5000/api/admin/donations",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setDonations(
          response.data.donations
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

  useEffect(() => {
    fetchDonations();
  }, []);

  const deleteDonation =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete this donation?"
        );

      if (!confirmDelete)
        return;

      try {

        await axios.delete(
          `http://localhost:5000/api/admin/donation/${id}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        fetchDonations();

      } catch (error) {

        console.log(error);

      }

    };

  return (
    <>
      <Navbar />

      <div className="admin-page">

        <div className="admin-header">

          <div>

            <h1 className="admin-title">
              Donation Management
            </h1>

            <p className="admin-subtitle">
              Manage every donation
              in the system.
            </p>

          </div>

        </div>

        {loading ? (

          <p>
            Loading donations...
          </p>

        ) : (

          <div className="admin-table-container">

            <table className="admin-table">

              <thead>

                <tr>

                  <th>Food</th>

                  <th>Restaurant</th>

                  <th>Status</th>

                  <th>Quantity</th>

                  <th>Actions</th>

                </tr>

              </thead>

              <tbody>

                {donations.length === 0 ? (

                  <tr>

                    <td
                      colSpan="5"
                      className="empty-state"
                    >
                      No donations found.
                    </td>

                  </tr>

                ) : (

                  donations.map(
                    (donation) => (

                      <tr
                        key={
                          donation._id
                        }
                      >

                        <td>
                          {
                            donation.foodName
                          }
                        </td>

                        <td>
                          {
                            donation
                              .restaurant
                              ?.name
                          }
                        </td>

                        <td>

                          <span
                            className={`role-badge role-${donation.status}`}
                          >
                            {
                              donation.status
                            }
                          </span>

                        </td>

                        <td>
                          {
                            donation.quantity
                          }
                        </td>

                        <td>

                          <button
                            className="delete-btn"
                            onClick={() =>
                              deleteDonation(
                                donation._id
                              )
                            }
                          >
                            Delete
                          </button>

                        </td>

                      </tr>

                    )
                  )

                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </>
  );
}