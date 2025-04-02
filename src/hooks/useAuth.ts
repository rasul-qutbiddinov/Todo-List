import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

// Helper to decode JWT token
function decodeToken(token: string) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload;
  } catch {
    return null;
  }
}

export const useAuth = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    navigate("/login");
  };

  const getUsername = () => {
    return localStorage.getItem("username") || "User";
  };

  const isTokenExpired = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return true;

    const decoded = decodeToken(token);
    if (!decoded?.exp) return true;

    const now = Date.now() / 1000;
    return decoded.exp < now;
  };

  // Auto logout effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (isTokenExpired()) {
        logout();
      }
    }, 5000); // check every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return { logout, getUsername };
};
