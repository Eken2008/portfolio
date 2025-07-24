"use client";

import { createContext, useContext, useEffect, useState } from "react";


interface ThemeContextType {
    isLightMode: boolean;
    toggleTheme?: () => void;
}

const ThemeContext = createContext<ThemeContextType>({isLightMode: false});

export default function Theme({ children }: { children: React.ReactNode }) {
    const [isLightMode, setIsLightMode] = useState(false); // Default to false (dark)

    // useEffect to read from localStorage or system preference on mount
    useEffect(() => {
        // Check localStorage first
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme === "light") {
            setIsLightMode(true);
        } else if (storedTheme === "dark") {
            setIsLightMode(false);
        } else {
            // Fallback to system preference if no stored theme
            const prefersLight = window.matchMedia(
                "(prefers-color-scheme: light)",
            ).matches;
            setIsLightMode(prefersLight);
        }
    }, []);

    useEffect(() => {
        const root = document.body.className = isLightMode ? "lightmode" : "";

        localStorage.setItem("theme", isLightMode ? "light" : "dark");
    }, [isLightMode]);

    const toggleTheme = () => {
        setIsLightMode((prev) => !prev);
    };

    return (
        <ThemeContext.Provider value={{ isLightMode, toggleTheme }}>
            {children}
            <button id="toggleTheme" className="button" onClick={toggleTheme} area-label="Toggle theme">
                <img alt="Turn on darkmode" src="/img/darkmode.svg" style={{ opacity: isLightMode ? 1 : 0 }} />
                <img alt="Turn on lightmode" src="/img/lightmode.svg" style={{ opacity: isLightMode ? 0 : 1 }} />
            </button>
        </ThemeContext.Provider>
    );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}