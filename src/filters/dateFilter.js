import store from "@/store";

export default function dateFilter(value, format = "date") {
  let settings = {};
  if (format.includes("date")) {
    settings.year = "numeric";
    settings.month = "long";
    settings.day = "2-digit";
  }
  if (format.includes("time")) {
    settings.hour = "2-digit";
    settings.minute = "2-digit";
    settings.second = "2-digit";
  }
  const locale = store.getters.info.locale || "ru-RU";
  return Intl.DateTimeFormat(locale, settings).format(new Date(value));
}
