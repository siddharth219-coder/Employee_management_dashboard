import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useSettings } from "../hooks/useSettings";
import { MdOutlineGridView } from "react-icons/md";
import { CiViewTable } from "react-icons/ci";
import { FiSun } from "react-icons/fi";
import { IoMoon } from "react-icons/io5";

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
          {theme === "light"  ? <IoMoon size={20}/> :  <FiSun size={20}/> }
        </button>

        <button type="button" onClick={toggleViewMode}>
          {viewMode === "card" ? <CiViewTable size={20}/> : <MdOutlineGridView size={20}/>}
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