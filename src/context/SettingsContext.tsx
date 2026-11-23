import { useEffect, createContext, useCallback, useMemo, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";

export type Theme = "light" | "dark";
export type ViewMode = "card" | "table";

interface SettingsContextValue {
    theme: Theme;
    toggleTheme: () => void;
    selectedDepartment: string;
    setSelectedDepartment: Dispatch<SetStateAction<string>>;
    viewMode: ViewMode;
    setViewMode: Dispatch<SetStateAction<ViewMode>>;
}

export const SettingsContext =
    createContext<SettingsContextValue | undefined>(undefined);

interface SettingsProviderProps {
    children: ReactNode;
}

export const SettingsProvider = ({

    children,
}: SettingsProviderProps) => {

    const [theme, setTheme] = useState<Theme>("light");
    const [selectedDepartment, setSelectedDepartment] =
        useState("");
    const [viewMode, setViewMode] =
        useState<ViewMode>("card");

    const toggleTheme = useCallback((): void => {
        setTheme((currentTheme) =>
            currentTheme === "light" ? "dark" : "light",
        );
    }, []);
    useEffect(() => {
        document.documentElement.dataset.theme = theme;
    }, [theme]);
    const value = useMemo(
        () => ({
            theme,
            toggleTheme,
            selectedDepartment,
            setSelectedDepartment,
            viewMode,
            setViewMode,
        }),
        [
            theme,
            toggleTheme,
            selectedDepartment,
            viewMode,
        ],
    );

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    );
};