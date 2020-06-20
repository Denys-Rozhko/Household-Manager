/* eslint-disable no-undef */
import firebase from "firebase/app";

export default {
  state: {
    info: {}
  },
  mutations: {
    setInfo(state, info) {
      state.info = info;
    },
    clearInfo(state) {
      state.info = {};
    }
  },
  actions: {
    async fetchInfo({ commit, dispatch }) {
      try {
        const uid = await dispatch("getUid");
        const info = (
          await firebase
            .database()
            .ref(`users/${uid}/info`)
            .once("value")
        ).val();
        commit("setInfo", info);
      } catch (e) {
        console.log(e);
      }
    },
    async updateInfo({ dispatch, commit, getters }, toUpdate) {
      try {
        const uid = await dispatch("getUid");
        const updatedData = {
          ...getters.info,
          ...toUpdate
        };
        await firebase
          .database()
          .ref(`users/${uid}/info`)
          .update(toUpdate);
        commit("setInfo", updatedData);
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    }
  },
  getters: {
    info: s => s.info
  }
};
