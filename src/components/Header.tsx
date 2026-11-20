import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useSettings } from "../hooks/useSettings";

const Header = () => {
  const {
    theme,
    toggleTheme,
    viewMode,
    setViewMode,
  } = useSettings();

  const {
    user,
    logout,
  } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const getPageTitle = (): string => {
    const path = location.pathname;

    if (path === "/dashboard") {
      return "Employee Dashboard";
    }

    if (path === "/employees") {
      return "Employees";
    }

    if (path === "/employees/add") {
      return "Add Employee";
    }

    if (path.startsWith("/employees/edit/")) {
      return "Edit Employee";
    }

    if (path.startsWith("/employees/")) {
      return "Employee Details";
    }

    if (path === "/settings") {
      return "Settings";
    }

    return "WorkForce";
  };

  const handleLogout = (): void => {
    logout();
    navigate("/login", { replace: true });
  };

  const toggleViewMode = (): void => {
    setViewMode(viewMode === "card" ? "table" : "card");
  };

  return (
    <header className="dashboard-header">
      <div>
        <h1>{getPageTitle()}</h1>

        {user && (
          <p className="logged-in-user">
            Signed in as {user.name} ({user.role})
          </p>
        )}
      </div>

      <div className="header-actions">
        <button type="button" onClick={toggleTheme}>
          {theme === "light" ? "Dark" : "Light"} Mode
        </button>

        <button type="button" onClick={toggleViewMode}>
          {viewMode === "card" ? "Table" : "Card"} View
        </button>

        <button
          className="logout-button"
          type="button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;