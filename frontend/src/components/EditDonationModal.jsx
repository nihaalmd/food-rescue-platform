import { useState } from "react";

export default function EditDonationModal({
  donation,
  onCancel,
  onSave,
}) {

  const [form, setForm] = useState({
    foodName: donation.foodName || "",
    quantity: donation.quantity || "",
    foodType: donation.foodType || "",
    expiryTime: donation.expiryTime
      ? donation.expiryTime.slice(0, 16)
      : "",
    pickupAddress:
      donation.pickupAddress || "",
    description:
      donation.description || "",
    status:
      donation.status || "available",
  });

  const handleChange = (e) => {

    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "quantity"
          ? Number(value)
          : value,
    }));

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    onSave(form);

  };

  return (
    <div className="modal-overlay">

      <div className="modal">

        <h3>Edit Donation</h3>

        <form onSubmit={handleSubmit}>

          <div className="form-row">
            <label>Food Name</label>
            <input
              name="foodName"
              value={form.foodName}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <label>Quantity</label>
            <input
              type="number"
              min="1"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <label>Food Type</label>
            <input
              name="foodType"
              value={form.foodType}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <label>Expiry Time</label>
            <input
              type="datetime-local"
              name="expiryTime"
              value={form.expiryTime}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <label>Pickup Address</label>
            <input
              name="pickupAddress"
              value={form.pickupAddress}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <label>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <label>Status</label>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option value="available">
                Available
              </option>

              <option value="claimed">
                Claimed
              </option>

              <option value="pickedup">
                Picked Up
              </option>

              <option value="completed">
                Completed
              </option>

            </select>

          </div>

          <div className="modal-actions">

            <button
              type="button"
              onClick={onCancel}
              className="btn"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn primary"
            >
              Save
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}