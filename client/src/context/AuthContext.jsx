import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true); // true until /me resolves

  // On mount, ask the server if the cookie session is still valid.
  // This is the single source of truth - no localStorage involved.
  useEffect(() => {
    api
      .get("/admin/me")
      .then((res) => setAdmin(res.data))
      .catch(() => setAdmin(null))
      .finally(() => setLoading(false));
  }, []);

  // Listen for 401s dispatched by the axios interceptor
  useEffect(() => {
    const handleExpired = () => setAdmin(null);
    window.addEventListener("auth:expired", handleExpired);
    return () => window.removeEventListener("auth:expired", handleExpired);
  }, []);

  const login = (data) => {
    // Server already set the httpOnly cookie - just update local state
    setAdmin(data);
  };

  const logout = async () => {
    try {
      await api.post("/admin/logout");
    } catch {
      // swallow - clear locally regardless
    } finally {
      setAdmin(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ admin, login, logout, loading, isAuthenticated: !!admin }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
};
