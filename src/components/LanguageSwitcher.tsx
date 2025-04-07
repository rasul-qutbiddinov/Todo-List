import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLang = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  return (
    <div className="flex space-x-2">
      <button onClick={() => changeLang("uz")}>UZ</button>
      <button onClick={() => changeLang("en")}>EN</button>
      <button onClick={() => changeLang("ru")}>RU</button>
    </div>
  );
};

export default LanguageSwitcher;
