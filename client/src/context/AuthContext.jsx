import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const baseUrl = import.meta.env.VITE_BASE_URL;

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Graceful localStorage checker
  const isStorageAvailable = () => {
    try {
      const test = "__storage_test__";
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      console.warn("LocalStorage is not available:", e);
      return false;
    }
  };

  // Safe load from localStorage
  const loadUserFromStorage = () => {
    if (!isStorageAvailable()) return null;
    try {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error("Error loading user:", error);
      return null;
    }
  };

  // Set user to both localStorage and state
  const login = (user) => {
    if (isStorageAvailable()) {
      try {
        localStorage.setItem("user", JSON.stringify(user));
      } catch (e) {
        console.warn("Failed to save user to localStorage");
      }
    }
    setCurrentUser(user);
  };

  const logout = async () => {
    if (isStorageAvailable()) {
      localStorage.removeItem("user");
    }
    setCurrentUser(null);
    try {
      await fetch(`${baseUrl}/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      console.log("Checking auth token...");
      try {
        const res = await fetch(`${baseUrl}/authentication`, {
          method: "POST",
          credentials: "include", // rely on secure cookie
        });
        const data = await res.json();
        if (data.message === "TokenConfirm") {
          // Update from cookie token only
          const user = isStorageAvailable() ? loadUserFromStorage() : null;
          if (user) {
            setCurrentUser(user);
            console.log("User in storage, token confirmed.");
          } else {
            // You might want to pull user info from server if needed
            console.log("No user in storage, token confirmed.");
          }
        } else {
          throw new Error("Token invalid");
        }
      } catch (err) {
        console.warn("Token check failed:", err);
        setCurrentUser(null);
        if (isStorageAvailable()) localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}