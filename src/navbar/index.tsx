import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { useState } from "react";
import { Moon, Sun, User } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const { logout, getUsername } = useAuth();
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const [showLangs, setShowLangs] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const username = getUsername();
  const currentLang = i18n.language;

  const changeLang = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
    setShowLangs(false);
  };

  // Sahifa login yoki signup bo‘lsa user menyusini ko‘rsatmaymiz
  const hideUserMenu =
    location.pathname === "/login" || location.pathname === "/signin";

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-white text-black shadow dark:bg-gray-900 dark:text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="rounded bg-indigo-500 px-2 py-1 text-base font-bold text-white">
          <Link to="/todo">{t("todoTitle")}</Link>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-3">
          {/* Language */}
          <div className="relative">
            <button
              onClick={() => setShowLangs(!showLangs)}
              className="rounded bg-indigo-500 px-2 py-1 text-sm text-white"
            >
              {currentLang.toUpperCase()}
            </button>
            {showLangs && (
              <ul className="absolute right-0 mt-2 w-24 rounded border border-gray-300 bg-white text-sm shadow dark:border-gray-700 dark:bg-gray-800">
                {["uz", "en", "ru"].map((l) => (
                  <li
                    key={l}
                    className="cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => changeLang(l)}
                  >
                    {l.toUpperCase()}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Theme toggle */}
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className={`rounded-xl p-1.5 text-white transition hover:opacity-90 ${
              theme === "light" ? "bg-yellow-400" : "bg-indigo-500"
            }`}
            title={theme === "light" ? t("darkMode") : t("lightMode")}
          >
            {theme === "light" ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* User dropdown (faqat login/signin dan boshqa sahifalarda) */}
          {!hideUserMenu && (
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-white"
              >
                <User size={16} />
              </button>

              {showMenu && (
                <div className="absolute top-12 right-0 w-44 rounded border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
                  <div className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-white">
                    {username}
                  </div>
                  <button
                    onClick={logout}
                    className="w-full bg-red-500 px-4 py-2 text-left text-sm text-white hover:bg-red-600"
                  >
                    {t("logout")}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
