/* eslint-disable prettier/prettier */
import store from "@/store";
import ru from "@/locales/RU.json";
import en from "@/locales/EN.json";

const locales = {
  "ru-RU": ru,
  "en-US": en
};

export default function(key) {
  const locale = store.getters.info.locale || "en-US";
  return locales[locale][key] || `[Localize error] key ${key} not found`;
}
