import { createStore } from "vuex";

export default createStore({
  state: {
    selectedFolderId: null,
  },
  mutations: {
    setSelectedFolderId(state, folderId) {
      state.selectedFolderId = folderId;
    },
  },
  actions: {
    updateSelectedFolderId({ commit }, folderId) {
      commit("setSelectedFolderId", folderId);
    },
  },
  getters: {
    selectedFolderId: (state) => state.selectedFolderId,
  },
});
