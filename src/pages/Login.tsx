import { useState, type FormEvent } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { type UserRole } from "../context/AuthContext";
import { useAuth } from "../hooks/useAuth";

interface LoginLocationState {
    from?: {
        pathname: string;
    };
}

const Login = () => {
    const [name, setName] = useState("");
    const [role, setRole] = useState<UserRole>("user");
    const [error, setError] = useState("");

    const {
        login,
        isAuthenticated,
    } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const locationState =
        location.state as LoginLocationState | null;

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    const handleSubmit = (
        event: FormEvent<HTMLFormElement>,
    ): void => {
        event.preventDefault();

        const trimmedName = name.trim();

        if (!trimmedName) {
            setError("Please enter your name.");
            return;
        }

        login(trimmedName, role);

        const destination =
            locationState?.from?.pathname ?? "/dashboard";

        navigate(destination, { replace: true });
    };

    return (
        <main className="login-page">
            <form
                className="login-form"
                onSubmit={handleSubmit}
                noValidate
            >
                <h1>WorkForce Login</h1>

                <p>Sign in to access the employee dashboard.</p>

                <label htmlFor="login-name">
                    Name
                </label>

                <input
                    id="login-name"
                    type="text"
                    value={name}
                    onChange={(event) => {
                        setName(event.target.value);
                        setError("");
                    }}
                    placeholder="Enter your name"
                    autoFocus
                />

                <label htmlFor="login-role">
                    Role
                </label>

                <select
                    id="login-role"
                    value={role}
                    onChange={(event) =>
                        setRole(event.target.value as UserRole)
                    }
                >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>

                {error && <p role="alert">{error}</p>}

                <button type="submit">
                    Login
                </button>
            </form>
        </main>
    );
};

export default Login;