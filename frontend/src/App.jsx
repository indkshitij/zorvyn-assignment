import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Home from "@/pages/Home";
import Dashboard from "@/pages/dashboard/Dashboard";
import Transactions from "@/pages/dashboard/Transactions";
import Insights from "@/pages/dashboard/Insights";
import Profile from "@/pages/dashboard/Profile";
import Unauthorized from "@/pages/Unauthorized";
import Error404 from "@/pages/Error404";
import InActiveScreen from "./pages/InActiveScreen";

const getAuth = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  return { token, user };
};

const RequireAuth = ({ allowedRoles }) => {
  const { token, user } = getAuth();

  // inactive user
  if (user && user.isActive === false) {
    return <Navigate to="/inactive" replace />;
  }

  // role check
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

const PublicRoute = ({ children }) => {
  const { token, user } = getAuth();

  // if logged in but inactive redirect inactive screen
  if (token && user?.isActive === false) {
    return <Navigate to="/inactive" replace />;
  }

  return token ? <Navigate to="/dashboard" replace /> : children;
};

function App() {
  return (
    <div className="bg-gradient-to-br from-zinc-900 via-zinc-950 to-black min-h-screen">
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />

        <Route path="/inactive" element={<InActiveScreen />} />

        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/profile" element={<Profile />} />
        </Route>

        {/* Role-based */}
        <Route
          element={
            <RequireAuth allowedRoles={["viewer", "admin", "analyst"]} />
          }
        >
          <Route path="/dashboard/transactions" element={<Transactions />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={["admin", "analyst"]} />}>
          <Route path="/dashboard/insights" element={<Insights />} />
        </Route>

        {/* Unauthorized */}
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* 404 */}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default App;
