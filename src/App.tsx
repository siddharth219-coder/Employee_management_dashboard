import { useCallback, useEffect, useRef, useState, } from "react";
import EmployeeList from "./components/EmployeeList";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeStats from "./components/EmployeeStats";
import SearchBar from "./components/SearchBar";
import DepartmentFilter from "./components/DepartmentFilter";
import Header from "./components/Header";
import { useEmployeeContext } from "./hooks/useEmployeeContext";

const App = () => {
    const { state, isLoading, error, retry, } = useEmployeeContext();

    const editingEmployee = state.selectedEmployee;

    const [search, setSearch] = useState("");

    const searchInputRef = useRef<HTMLInputElement>(null);
    const employeeFormRef = useRef<HTMLDivElement>(null);
    const renderCountRef = useRef(0);

    useEffect(() => {
        renderCountRef.current += 1;

        console.log(
            "App render count:",
            renderCountRef.current,
        );
    });

    useEffect(() => {
        if (editingEmployee) {
            employeeFormRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }, [editingEmployee]);

    useEffect(() => {
        if (!isLoading && !error) {
            searchInputRef.current?.focus();
        }
    }, [isLoading, error]);

    const handleSearchChange = useCallback(
        (value: string): void => {
            setSearch(value);
        },
        [],
    );

    if (isLoading) {
        return (
            <p role="status">
                Loading employees...
            </p>
        );
    }

    if (error) {
        return (
            <div>
                <p role="alert">
                    Could not load employees: {error}
                </p>

                <button
                    className="retry-button"
                    type="button"
                    onClick={retry}
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="dashboard">
            <aside className="sidebar">
                <strong>WorkForce</strong>

                <nav aria-label="Dashboard navigation">
                    <a href="#overview">Overview</a>
                    <a href="#employees">Employees</a>
                </nav>
            </aside>

            <main className="dashboard-content">
                <Header />

                <EmployeeStats />

                <div ref={employeeFormRef}>
                    <EmployeeForm
                        key={editingEmployee?.id ?? "add"}
                    />
                </div>

                <section
                    id="employees"
                    className="employees"
                >
                    <h2>Employees</h2>

                    <div>
                        <SearchBar
                            ref={searchInputRef}
                            search={search}
                            onSearchChange={handleSearchChange}
                        />

                        <DepartmentFilter />
                    </div>

                    <EmployeeList search={search} />
                </section>

                <footer className="dashboard-footer">
                    Workforce Employee Dashboard
                </footer>
            </main>
        </div>
    );
};

export default App;