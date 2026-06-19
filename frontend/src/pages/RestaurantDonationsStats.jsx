import Navbar from "../components/Navbar";

export default function RestaurantDonationsStats() {
  const donations = JSON.parse(localStorage.getItem("restaurantDonations") || "[]");

  const total = donations.length;
  const totalQuantity = donations.reduce((s, d) => s + (Number(d.quantity) || 0), 0);
  const byStatus = donations.reduce((acc, d) => {
    acc[d.status] = (acc[d.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <Navbar />
      <div className="page-content">
        <h1>Donation Stats</h1>
        <div className="stats-grid">
          <div className="stat-card">
            <h2>{total}</h2>
            <p>Total Donations</p>
          </div>
          <div className="stat-card">
            <h2>{totalQuantity}</h2>
            <p>Total Quantity</p>
          </div>
          {Object.entries(byStatus).map(([status, count]) => (
            <div className="stat-card" key={status}>
              <h2>{count}</h2>
              <p>{status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
