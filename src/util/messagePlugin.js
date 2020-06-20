import localizeFilter from "@/filters/localizeFilter";

export default {
  install(Vue) {
    Vue.prototype.$message = function(text) {
      window.M.toast({ html: text });
    };
    const err = localizeFilter("Error");
    Vue.prototype.$error = function(text) {
      window.M.toast({ html: `[${err}] ${text}` });
    };
  }
};
