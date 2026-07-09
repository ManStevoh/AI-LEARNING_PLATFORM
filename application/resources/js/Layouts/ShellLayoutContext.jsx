import { createContext, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'ace.sidebar.collapsed';

const ShellLayoutContext = createContext(null);

export function ShellLayoutProvider({ children, codingFocus = false }) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
        if (typeof window === 'undefined') {
            return codingFocus;
        }

        const stored = window.localStorage.getItem(STORAGE_KEY);

        if (stored !== null) {
            return stored === 'true';
        }

        return codingFocus;
    });

    useEffect(() => {
        if (codingFocus && window.localStorage.getItem(STORAGE_KEY) === null) {
            setSidebarCollapsed(true);
        }
    }, [codingFocus]);

    const toggleSidebar = () => {
        setSidebarCollapsed((current) => {
            const next = !current;
            window.localStorage.setItem(STORAGE_KEY, String(next));

            return next;
        });
    };

    return (
        <ShellLayoutContext.Provider value={{ sidebarCollapsed, toggleSidebar, codingFocus }}>
            {children}
        </ShellLayoutContext.Provider>
    );
}

export function useShellLayout() {
    const context = useContext(ShellLayoutContext);

    if (context === null) {
        throw new Error('useShellLayout must be used within ShellLayoutProvider');
    }

    return context;
}
