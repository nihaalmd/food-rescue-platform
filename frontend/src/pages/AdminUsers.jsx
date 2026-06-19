import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../styles/admin.css";

export default function AdminUsers() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchUsers = async () => {

    try {

      const response =
        await axios.get(
          "http://localhost:5000/api/admin/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      setUsers(response.data.users);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this user?"
      );

    if (!confirmDelete) return;

    try {

      await axios.delete(
        `http://localhost:5000/api/admin/user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchUsers();

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to delete user"
      );

    }

  };

  return (
    <>
      <Navbar />

      <div className="admin-page">

        <div className="admin-header">

          <div>

            <h1 className="admin-title">
              User Management
            </h1>

            <p className="admin-subtitle">
              Manage all restaurants, NGOs and admins.
            </p>

          </div>

        </div>

        {loading ? (

          <p>Loading users...</p>

        ) : (

          <div className="admin-table-container">

            <table className="admin-table">

              <thead>

                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>

              </thead>

              <tbody>

                {users.length === 0 ? (

                  <tr>

                    <td
                      colSpan="4"
                      className="empty-state"
                    >
                      No users found.
                    </td>

                  </tr>

                ) : (

                  users.map((user) => (

                    <tr key={user._id}>

                      <td>{user.name}</td>

                      <td>{user.email}</td>

                      <td>

                        <span
                          className={`role-badge role-${user.role}`}
                        >
                          {user.role}
                        </span>

                      </td>

                      <td>

                        <button
                          className="delete-btn"
                          onClick={() =>
                            deleteUser(user._id)
                          }
                        >
                          Delete
                        </button>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </>
  );
}