import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = (prop) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const login = () => {
        setIsAuthenticated(true)
    }

    const logout = () => {
        setIsAuthenticated(false)
    }

    useEffect(() => {
        async function checkToken() {
            try {
                console.log(isAuthenticated)
                const res = await fetch('http://localhost:3333/authentication', {
                    method: 'POST',
                    credentials: 'include',
                });
                const data = await res.json();
                setIsAuthenticated(data.message === 'TokenConfirm');
            } catch (error) {
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        }
        checkToken();
    }, [isAuthenticated]); // Re-run when isAuthenticated changes

    return (
        <AuthContext.Provider value={{ isAuthenticated, loading, login, logout  }}>
            {prop.children}
        </AuthContext.Provider>
    );
};
