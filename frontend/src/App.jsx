import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";

/* PUBLIC PAGES */
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import Register from "./pages/Register";
import Login from "./pages/Login";

/* RESTAURANT */
import RestaurantDashboard from "./pages/restaurantDashboard";
import UploadDonation from "./pages/UploadDonation";
import DonationDetails from "./pages/DonationDetails";
import DonationStatus from "./pages/DonationStatus";
import RestaurantDonationsStats from "./pages/RestaurantDonationsStats";
import RestaurantProfile from "./pages/RestaurantProfile";

/* NGO */
import NGODashboard from "./pages/NGODashboard";
import NGODonationsFeed from "./pages/NGODonationsFeed";
import NGODonationDetails from "./pages/NGODonationDetails";
import NGOActivePickups from "./pages/NGOActivePickups";
import NGORescueHistory from "./pages/NGORescueHistory";
import NGOProfile from "./pages/NGOProfile";
import PickupLocation from "./pages/PickupLocation";

import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminDonations from "./pages/AdminDonations";
import AdminSystem from "./pages/AdminSystem";

/* COMPONENTS */
import Footer from "./components/Footer";

function AppContent() {

  const location = useLocation();

  const hideFooterRoutes = [
    "/register",
    "/login"
  ];

  return (
    <>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route
          path="/about"
          element={<AboutPage />}
        />
        <Route
          path="/how-it-works"
          element={<HowItWorksPage />}
        />
        <Route
          path="/register"
          element={<Register />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        {/* RESTAURANT ROUTES */}
        <Route
          path="/restaurant/dashboard"
          element={<RestaurantDashboard />}
        />
        <Route
          path="/restaurant/upload"
          element={<UploadDonation />}
        />
        <Route
          path="/restaurant/donation/:id"
          element={<DonationDetails />}
        />
        <Route
          path="/restaurant/donation/:id/status"
          element={<DonationStatus />}
        />
        <Route
          path="/restaurant/stats"
          element={<RestaurantDonationsStats />}
        />
        <Route
          path="/restaurant/profile"
          element={<RestaurantProfile />}
        />
        {/* NGO ROUTES */}
        <Route
          path="/ngo/dashboard"
          element={<NGODashboard />}
        />
        <Route
          path="/ngo/feed"
          element={<NGODonationsFeed />}
        />
        <Route
          path="/ngo/donation/:id"
          element={<NGODonationDetails />}
        />
        <Route
          path="/ngo/active"
          element={<NGOActivePickups />}
        />
        <Route
          path="/ngo/pickup-location/:id"
          element={<PickupLocation />}
        />
        <Route
          path="/ngo/history"
          element={<NGORescueHistory />}
        />
        <Route
          path="/ngo/profile"
          element={<NGOProfile />}
        />
        <Route
          path="/admin"
          element={<AdminDashboard />}
        />
        <Route
          path="/admin/users"
          element={<AdminUsers />}
        />
        <Route
          path="/admin/donations"
          element={<AdminDonations />}
        />
        <Route
          path="/admin/system"
          element={<AdminSystem />}
        />

      </Routes>
      {!hideFooterRoutes.includes(location.pathname) && (
        <Footer />
      )}
    </>
  );
}

function App() {

  return (
    <ThemeProvider>

      <BrowserRouter>

        <AppContent />

      </BrowserRouter>

    </ThemeProvider>
  );
}

export default App;