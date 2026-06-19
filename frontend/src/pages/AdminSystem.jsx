import axios from "axios";
import Navbar from "../components/Navbar";
import "../styles/admin.css";

export default function AdminSystem() {

  const token =
    localStorage.getItem("token");

  const clearCompleted =
    async () => {

      const confirmAction =
        window.confirm(
          "Delete all completed donations?"
        );

      if (!confirmAction)
        return;

      try {

        await axios.delete(
          "http://localhost:5000/api/admin/clear-completed",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        alert(
          "Completed donations removed"
        );

      } catch (error) {

        console.log(error);

      }

    };

  const resetSystem =
    async () => {

      const confirmAction =
        window.confirm(
          "WARNING: Delete ALL donations?"
        );

      if (!confirmAction)
        return;

      try {

        await axios.delete(
          "http://localhost:5000/api/admin/reset-system",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        alert(
          "System reset complete"
        );

      } catch (error) {

        console.log(error);

      }

    };

  return (
    <>
      <Navbar />

      <div className="admin-page">

        <h1 className="admin-title">
          System Controls
        </h1>

        <p className="admin-subtitle">
          Dangerous actions.
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            marginTop: "40px",
          }}
        >

          <button
            className="delete-btn"
            onClick={
              clearCompleted
            }
          >
            Clear Completed Donations
          </button>

          <button
            className="delete-btn"
            onClick={
              resetSystem
            }
          >
            Reset Entire Platform
          </button>

        </div>

      </div>
    </>
  );
}