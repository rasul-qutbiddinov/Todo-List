import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const LanguageWrapper = ({ children }: { children: React.ReactNode }) => {
  const { lang } = useParams();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (lang && i18n.language !== lang) {
      i18n.changeLanguage(lang);
      localStorage.setItem("lang", lang);
    }
  }, [lang, i18n]);

  return <>{children}</>;
};

export default LanguageWrapper;
