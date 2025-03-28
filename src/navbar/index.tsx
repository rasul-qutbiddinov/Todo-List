import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { useState } from "react";
import { Moon, Sun } from "lucide-react";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [lang, setLang] = useState("uzb");
  const [showLangs, setShowLangs] = useState(false);

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-white text-black shadow dark:bg-gray-900 dark:text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* TODO LIST logo */}
        <div className="rounded bg-indigo-500 px-3 py-2 text-xl font-bold text-white">
          <Link to="/">TODO LIST</Link>
        </div>

        {/* Right side */}
        <div className="relative flex items-center space-x-4">
          {/* Dark mode */}
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className={`rounded-xl p-2 text-white transition hover:opacity-90 ${
              theme === "light" ? "bg-yellow-400" : "bg-indigo-500"
            }`}
          >
            {theme === "light" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Simple language dropdown */}
          <div>
            <button
              onClick={() => setShowLangs(!showLangs)}
              className="rounded bg-indigo-500 px-3 py-1 text-white"
            >
              {lang.toUpperCase()}
            </button>
            {showLangs && (
              <ul className="absolute right-0 mt-2 w-20 rounded border border-gray-300 bg-white text-sm dark:border-gray-700 dark:bg-gray-800">
                <li
                  className="cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => {
                    setLang("uzb");
                    setShowLangs(false);
                  }}
                >
                  UZB
                </li>
                <li
                  className="cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => {
                    setLang("eng");
                    setShowLangs(false);
                  }}
                >
                  ENG
                </li>
                <li
                  className="cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => {
                    setLang("rus");
                    setShowLangs(false);
                  }}
                >
                  RUS
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
