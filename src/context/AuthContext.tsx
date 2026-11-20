import { createContext, useMemo, useState, type ReactNode, } from "react";

export type UserRole = "admin" | "user";

interface AuthUser {
    name: string;
    role: UserRole;
}

interface AuthContextValue {
    user: AuthUser | null;
    isAuthenticated: boolean;
    login: (name: string, role: UserRole) => void;
    logout: () => void;
}

export const AuthContext =createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({
    children,
}: AuthProviderProps) => {
    const [user, setUser] = useState<AuthUser | null>(() => {
        const savedUser = localStorage.getItem("workforce-user");

        if (!savedUser) {
            return null;
        }

        try {
            return JSON.parse(savedUser) as AuthUser;
        } catch {
            localStorage.removeItem("workforce-user");
            return null;
        }
    });

    const login = (name: string, role: UserRole): void => {
        const authenticatedUser: AuthUser = {
            name,
            role,
        };

        setUser(authenticatedUser);

        localStorage.setItem(
            "workforce-user",
            JSON.stringify(authenticatedUser),
        );
    };

    const logout = (): void => {
        setUser(null);
        localStorage.removeItem("workforce-user");
    };

    const value = useMemo(
        () => ({
            user,
            isAuthenticated: Boolean(user),
            login,
            logout,
        }),
        [user],
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};