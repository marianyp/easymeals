import Vue from "vue";
import Router from "vue-router";

import Home from "./views/Home.vue";
import Meals from "./views/Meals.vue";
import Recipe from "./views/recipe/_id";
import Favorites from "./views/Favorites.vue";
import NotFound from "./views/NotFound.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/meals",
      name: "meals",
      component: Meals
    },
    {
      path: "/recipe/:id",
      name: "recipe",
      component: Recipe
    },
    {
      path: "/favorites",
      name: "favorites",
      component: Favorites
    },
    {
      path: "/404",
      component: NotFound
    },
    {
      path: "*",
      redirect: "/404"
    }
  ]
});
