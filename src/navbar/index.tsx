import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { useState, useEffect } from "react";
import { Moon, Sun, User } from "lucide-react";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [lang, setLang] = useState("uzb");
  const [showLangs, setShowLangs] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [username, setUsername] = useState<string | null>("");

  const navigate = useNavigate();

  // Get username from localStorage
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-white text-black shadow dark:bg-gray-900 dark:text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="rounded bg-indigo-500 px-3 py-2 text-xl font-bold text-white">
          <Link to="/">TODO LIST</Link>
        </div>

        {/* Right */}
        <div className="relative flex items-center space-x-4">
          {/* Theme toggle */}
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className={`rounded-xl p-2 text-white transition hover:opacity-90 ${
              theme === "light" ? "bg-yellow-400" : "bg-indigo-500"
            }`}
          >
            {theme === "light" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Language */}
          <div>
            <button
              onClick={() => setShowLangs(!showLangs)}
              className="rounded bg-indigo-500 px-3 py-1 text-white"
            >
              {lang.toUpperCase()}
            </button>
            {showLangs && (
              <ul className="absolute top-12 right-20 w-20 rounded border border-gray-300 bg-white text-sm dark:border-gray-700 dark:bg-gray-800">
                {["uzb", "eng", "rus"].map((l) => (
                  <li
                    key={l}
                    className="cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => {
                      setLang(l);
                      setShowLangs(false);
                    }}
                  >
                    {l.toUpperCase()}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* 🔵 User Avatar */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-500 text-white"
            >
              <User size={18} />
            </button>

            {showMenu && (
              <div className="absolute top-12 right-0 w-20 rounded border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
                {/* Username */}
                {username && (
                  <div className="bg-indigo-500 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-800 dark:text-white">
                    {username}
                  </div>
                )}

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="w-full rounded-xs bg-red-500 px-4 py-2 text-left text-sm text-white hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
