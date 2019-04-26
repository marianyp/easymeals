<template>
  <div class="recipe h-screen flex flex-col items-center">
    <div class="block lg:hidden w-full h-32 mb-12">
      <img class="w-full h-full banner shadow-lg" :src="recipe.strMealThumb" />
    </div>
    <div class="wrapper px-8 w-full flex flex-col items-center lg:items-start">
      <div class="flex mb-2">
        <div @click="favoriteAction()" class="favorite-logo mr-2">
          <img
            class="cursor-pointer"
            :src="postFavorited ? icons.FavoriteIcon : icons.UnfavoriteIcon"
          />
        </div>
        <h4 class="title font-montserrat font-bold text-custom-grey">
          {{ recipe.strMeal }}
        </h4>
      </div>
      <div class="lg:flex flex-row w-full">
        <img class="h-64 mr-4 hidden lg:block" :src="recipe.strMealThumb" />
        <p class="text-custom-grey font-roboto leading-normal">
          {{ recipe.strInstructions }}
        </p>
      </div>
      <hr class="w-full" />
      <div class="self-start mb-6">
        <h5 class="font-montserrat font-bold text-2xl text-custom-grey my-4">
          Ingredients
        </h5>
        <ul class="custom-list list-reset">
          <li
            class="capitalize font-montserrat font-normal text-custom-grey"
            v-for="ingredient in ingredients"
            :key="ingredient"
          >
            {{ ingredient }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import FavoriteIcon from "@/assets/svgs/favorite1.svg"; // Favorite icon for 'favorite' button
import UnfavoriteIcon from "@/assets/svgs/favorite0.svg"; // Unfavorite icon for 'favorite' button

export default {
  data() {
    return {
      recipe: {},
      ingredients: [],
      postFavorited: null,
      icons: { FavoriteIcon, UnfavoriteIcon } // Making icons available to DOM
    };
  },
  created() {
    this.fetchRecipe();
  },
  methods: {
    fetchRecipe() {
      axios
        .get(
          "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" +
            this.$route.params.id // Get recipe based on current route id
        )
        .then(res => {
          this.recipe = res.data.meals[0];

          // This entire portion of code is checking if the recipe is present in the users favorites
          // If localstorage gives back null, then the user has not favorited anything and this.postFavorited gets set to false
          // If there's something in the localstorage, we parse the data and check if the recipe id is present

          if (JSON.parse(localStorage.getItem("favorites")) != null) {
            this.postFavorited = JSON.parse(localStorage.getItem("favorites"))[
              this.recipe.idMeal
            ]
              ? true
              : false;
          } else {
            this.postFavorited = false;
          }

          this.identifyIngrediants();
        });
    },
    identifyIngrediants() {
      // Go thru all strIngredient variables from the response and add to ingredients list and also see which ones are empty
      for (let i = 1; i < 21; i++) {
        if (this.recipe[`strIngredient` + i] != "") {
          this.ingredients.push(this.recipe[`strIngredient` + i].toLowerCase());
        } else {
          break;
        }
      }
    },
    favoriteAction() {
      let favorites = JSON.parse(localStorage.getItem("favorites")) || {}; // Get a copy of current localStorage values
      if (this.postFavorited) {
        // Check if when clicked, was the recipe already favorited. If so, remove the recipe from local storage.
        // If not, add the recipe to favorites

        delete favorites[this.recipe.idMeal];
        // console.log('deleted from favorites')
      } else {
        favorites[this.recipe.idMeal] = this.recipe.strMeal;
        // console.log('added to favorites')
      }

      localStorage.setItem("favorites", JSON.stringify(favorites)); // Update local storage to our instance of favorites
      // console.log('updated favorites')

      this.postFavorited = !this.postFavorited; // Invert the postFavorited variable
    }
  }
};
</script>

<style>
.recipe {
  padding-top: 5.3rem;
}
.banner {
  object-fit: cover;
}

hr {
  height: 2px;
  background: #b5b5b5;
  margin: 1.5em 0;
}

.custom-list ul {
  list-style-type: none;
}

.custom-list li::before {
  display: inline-block;
  vertical-align: middle;
  width: 4px;
  height: 4px;
  border-radius: 100%;
  background-color: #313131;
  margin-right: 8px;
  content: " ";
}
</style>
