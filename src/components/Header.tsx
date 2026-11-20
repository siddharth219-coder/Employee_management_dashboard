import { memo } from "react";
import { useSettings } from "../hooks/useSettings";

const Header = () => {
  const {
    theme,
    toggleTheme,
    viewMode,
    setViewMode,
  } = useSettings();

  const toggleViewMode = (): void => {
    setViewMode((currentView) =>
      currentView === "card" ? "table" : "card",
    );
  };

  return (
    <header id="overview" className="dashboard-header">
      <h1>Employee Dashboard</h1>

      <div className="header-actions">
        <button type="button" onClick={toggleTheme}>
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>

        <button type="button" onClick={toggleViewMode}>
          {viewMode === "card" ? "Table View" : "Card View"}
        </button>
      </div>
    </header>
  );
};

export default memo(Header);