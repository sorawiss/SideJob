import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();


const baseUrl = import.meta.env.VITE_BASE_URL
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
        await fetch(`${baseUrl}/logout`, {
            method: 'POST',
            credentials: 'include',
        }) 
    }



    useEffect(() => {
        async function checkToken() {
            console.log('Checking token...');
            try {
                const res = await fetch(`${baseUrl}/authentication`, {
                    method: 'POST',
                    credentials: 'include',
                });
                const data = await res.json();
                if (data.message !== 'TokenConfirm') {
                    setCurrentUser(null);
                    localStorage.removeItem('user');
                    console.log("invalid token")
                }
            } catch (error) {
                setCurrentUser(null);
            } finally {
                setLoading(false)
                console.log("token checked")
            }
        }
        checkToken();
    }, [currentUser]); 

    return (
        <AuthContext.Provider value={{ currentUser, loading, login, logout }}>
            {props.children}
        </AuthContext.Provider>
    );
};
