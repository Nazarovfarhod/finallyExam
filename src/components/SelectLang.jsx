import { Select } from "flowbite-react";
import { useTranslation } from "react-i18next";

export default function SelectLang() {
  const { i18n } = useTranslation();

  function changeLang(value) {
    i18n.changeLanguage(value);
  }

  return (
    <Select onChange={(e) => changeLang(e.target.value)} required>
      <option value="uz">UZB</option>
      <option value="ru">RUS</option>
      <option value="en">EN</option>
    </Select>
  );
}
