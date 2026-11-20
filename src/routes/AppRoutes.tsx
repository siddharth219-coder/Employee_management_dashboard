import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import Dashboard from "../pages/Dashboard";
import Employees from "../pages/Employees";
import EmployeeDetails from "../pages/EmployeeDetails";
import AddEmployee from "../pages/AddEmployee";
import EditEmployee from "../pages/EditEmployee";
import Settings from "../pages/Settings";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={<Navigate to="/dashboard" replace />}
      />

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route path="/employees">
            <Route index element={<Employees />} />

            <Route
              path="add"
              element={<AddEmployee />}
            />

            <Route
              path="edit/:id"
              element={<EditEmployee />}
            />

            <Route
              path=":id"
              element={<EmployeeDetails />}
            />
          </Route>

          <Route
            element={
              <ProtectedRoute allowedRoles={["admin"]} />
            }
          >
            <Route
              path="/settings"
              element={<Settings />}
            />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;