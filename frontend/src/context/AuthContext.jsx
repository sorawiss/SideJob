import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = (props) => {

    const getUserFromStorage = () => {
        try {
            const user = localStorage.getItem("user")
            return user ? JSON.parse(user) : null
        } catch (error) {
            console.error("Error parsing user from localStorage:", error)
            return null;
        }
    }

    
    const [currentUser, setCurrentUser] = useState(getUserFromStorage())
    const [loading, setLoading] = useState(true)




    const login = (user) => {
        localStorage.setItem('user', JSON.stringify(user))
        setCurrentUser(user)
    }

    
    const logout = async () => {
        localStorage.removeItem('user')
        setCurrentUser(null)
        await fetch('http://localhost:3333/logout', {
            method: 'POST',
            credentials: 'include',
        }) 
    }



    useEffect(() => {
        async function checkToken() {
            try {
                const res = await fetch('http://localhost:3333/authentication', {
                    method: 'POST',
                    credentials: 'include',
                });
                const data = await res.json();
                if (data.message !== 'TokenConfirm') {
                    setCurrentUser(null);
                    localStorage.removeItem('user');
                }
            } catch (error) {
                setCurrentUser(null);
            } finally {
                setLoading(false)
            }
        }
        checkToken();
    }, []); 

    return (
        <AuthContext.Provider value={{ currentUser, loading, login, logout }}>
            {props.children}
        </AuthContext.Provider>
    );
};
