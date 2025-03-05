import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = (prop) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // Add login and logout functions to the context
    const login = async () => {
        //Store Token
        try {
            const res = await fetch('http://localhost:3333/login', {
                method: 'POST',
                credentials: 'include',
            });
            const data = await res.json();
            if (data.message === 'Login') {
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error("Login Error: ", error);
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
    };

    useEffect(() => {
        async function checkToken() {
            try {
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
        <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
            {prop.children}
        </AuthContext.Provider>
    );
};
