import firebase from "firebase/app";

export default {
  actions: {
    async addRecord({ commit, dispatch }, record) {
      try {
        const uid = await dispatch("getUid");
        return firebase
          .database()
          .ref(`users/${uid}/records/`)
          .push(record);
      } catch (e) {
        commit("serError", e);
        throw e;
      }
    },
    async fetchRecords({ /*commit,*/ dispatch }) {
      try {
        const uid = await dispatch("getUid");
        const records =
          (
            await firebase
              .database()
              .ref(`users/${uid}/records/`)
              .once("value")
          ).val() || {};
        return Object.keys(records).map(key => ({
          ...records[key],
          id: key
        }));
      } catch (e) {
        //commit("serError", e);
        console.log(e);
        throw e;
      }
    },
    async fetchRecordById({ commit, dispatch }, id) {
      try {
        const uid = await dispatch("getUid");
        const record =
          (
            await firebase
              .database()
              .ref(`users/${uid}/records/`)
              .child(id)
              .once("value")
          ).val() || {};
        return {
          ...record,
          id
        };
      } catch (e) {
        commit("serError", e);
        throw e;
      }
    }
  }
};
