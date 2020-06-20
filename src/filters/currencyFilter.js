import store from "@/store";

export default function(value, currency = "RUB") {
  const locale = store.getters.info.locale || "ru-RU";
  return Intl.NumberFormat(locale, {
    style: "currency",
    currency
  }).format(value);
}
