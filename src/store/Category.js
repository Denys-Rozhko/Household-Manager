import firebase from "firebase/app";

export default {
  actions: {
    async createCategory({ commit, dispatch }, { title, limit }) {
      try {
        const uid = await dispatch("getUid");
        const category = firebase
          .database()
          .ref(`users/${uid}/categories`)
          .push({
            title,
            limit
          });
        return {
          title,
          limit,
          id: category.key
        };
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async fetchCategories({ commit, dispatch }) {
      try {
        const uid = await dispatch("getUid");
        const categories = (
          await firebase
            .database()
            .ref(`users/${uid}/categories`)
            .once("value")
        ).val() || {};
        console.log(categories);
        return Object.keys(categories).map(key => ({
          id: key,
          ...categories[key]
        }));
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async fetchCategoryById({ commit, dispatch }, id) {
      try {
        const uid = await dispatch("getUid");
        const category = (
          await firebase
            .database()
            .ref(`users/${uid}/categories`)
            .child(id)
            .once("value")
        ).val();

        return {
          id,
          ...category
        };
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async editCategory({ commit, dispatch }, { id, title, limit }) {
      try {
        const uid = await dispatch("getUid");
        await firebase
          .database()
          .ref(`users/${uid}/categories`)
          .child(id)
          .update({
            title,
            limit
          });
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    }
  }
};
