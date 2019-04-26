import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loadedRecipes: []
  },
  mutations: {
    addLoadedRecipes(state, recipe) {
      state.loadedRecipes = recipe;
    },
    clearLoadedRecipes(state) {
      state.loadedRecipes = [];
    }
  }
});
