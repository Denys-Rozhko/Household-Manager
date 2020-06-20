import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth";
import info from "./info";
import Category from "./Category";
import record from "./record";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    error: null
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    }
  },
  actions: {
    async fetchCurrency() {
      const answer = await fetch(
        "https://fixer-fixer-currency-v1.p.rapidapi.com/latest?base=RUB&symbols=EUR,RUB,USD",
        {
          headers: {
            "x-rapidapi-host": process.env.VUE_APP_FIXER_HOST,
            "x-rapidapi-key": process.env.VUE_APP_FIXER_KEY
          }
        }
      );
      const result = await answer.json();
      return result;
    }
  },
  getters: {
    error: s => s.error
  },
  modules: {
    auth,
    info,
    Category,
    record
  }
});
