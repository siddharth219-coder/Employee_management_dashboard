import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <aside className="sidebar">
      <strong>WorkForce</strong>

      <nav aria-label="Main navigation">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/employees"
          end
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Employees
        </NavLink>

        <NavLink
          to="/employees/add"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Add Employee
        </NavLink>

        {user?.role === "admin" && (
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            Settings
          </NavLink>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;