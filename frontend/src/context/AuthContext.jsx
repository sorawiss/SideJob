import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = (prop) => {
    const [curentUser, setCurentUser] = useState(JSON.parse(localStorage.getItem("user")) || null)
    const [loading, setLoading] = useState(true);


    const login = (user) => {
        localStorage.setItem('user', JSON.stringify(user))
        setCurentUser(user)
    }

    const logout = () => {
        setCurentUser(null)
        localStorage.removeItem('user')
    }

    useEffect(() => {
        async function checkToken() {
            try {
                console.log(curentUser)
                const res = await fetch('http://localhost:3333/authentication', {
                    method: 'POST',
                    credentials: 'include',
                });
                const data = await res.json();
                if (data.message !== 'TokenConfirm') {
                    setCurentUser(null);
                    localStorage.removeItem('user');
                    console.log(curentUser)
                }
            } catch (error) {
                setCurentUser(null);
            } finally {
                setLoading(false);
            }
        }
        checkToken();
    }, [curentUser]); // Re-run when isAuthenticated changes

    return (
        <AuthContext.Provider value={{ curentUser, loading, login, logout }}>
            {prop.children}
        </AuthContext.Provider>
    );
};
