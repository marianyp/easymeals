<template>
  <div class="meals h-screen">
    <div class="wrapper w-full flex flex-col items-center justify-center pt-32">
      <h2
        class="lg:self-start font-montserrat font-bold text-4xl text-custom-black mb-8 px-8"
      >
        Favorites
      </h2>
      <div
        class="card-wrapper md:w-5/6 lg:w-full flex flex-wrap md:flex-row flex-col items-center justify-center"
      >
        <RecipeCard
          v-for="recipe in recipes"
          :key="recipe.idMeal + Math.floor(Math.random() * 100)"
          :id="recipe.idMeal"
          :title="recipe.strMeal"
          :description="recipe.strInstructions"
          :picture="recipe.strMealThumb"
        ></RecipeCard>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import RecipeCard from "@/components/RecipeCard";

export default {
  components: {
    RecipeCard
  },

  data() {
    return {
      favorites: [],
      recipes: []
    };
  },
  created() {
    this.fetchFavorites();
    this.fetchFavoriteRecipes();
  },
  methods: {
    fetchFavorites() {
      if (JSON.parse(localStorage.getItem("favorites")) != null) {
        this.favorites = JSON.parse(localStorage.getItem("favorites")); // Get all of the favorites in form of an object
      }
    },

    fetchFavoriteRecipes() {
      // Iterate thru all the ids in this.favorites and fetch the meals by the id, then appending them to this.recipes
      Object.keys(this.favorites).forEach(id => {
        axios
          .get("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id)
          .then(res => {
            this.recipes.push(res.data.meals[0]);
          });
      });
    }
  }
};
</script>

<style></style>
