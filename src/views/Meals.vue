<template>
  <div class="meals h-screen">
    <div class="wrapper w-full flex flex-col items-center justify-center pt-32">
      <h2
        class="lg:self-start font-montserrat font-bold text-4xl text-custom-black mb-8 px-8"
      >
        Meals
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
        />
      </div>
      <button
        @click="fetchData()"
        class="generate font-montserrat text-custom-green font-bold text-xl px-6 md:w-64 h-12 py-2"
      >
        Generate More
      </button>
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
      recipes: []
    };
  },
  updated() {
    this.updateStore(); // Whenever the DOM updates (new meals, meals removed, etc), update the store
  },
  beforeRouteEnter(to, from, next) {
    // Get 5 recipes before page loads
    let preData = [];
    for (let i = 0; i < 5; i++) {
      axios
        .get("https://www.themealdb.com/api/json/v1/1/random.php")
        .then(res => {
          preData.push(res.data.meals[0]);
        });
    }
    next(vm => (vm.recipes = preData));
  },
  methods: {
    fetchData() {
      // Simple function to populate this.recipes meals
      for (let i = 0; i < 5; i++) {
        axios
          .get("https://www.themealdb.com/api/json/v1/1/random.php")
          .then(res => {
            this.recipes.push(res.data.meals[0]);
          });
      }
    },
    updateStore() {
      if (this.$store.state.loadedRecipes.length != 0) {
        this.recipes = this.$store.state.loadedRecipes;
      } else {
        this.$store.commit("addLoadedRecipes", this.recipes);
      }
    }
  }
};
</script>

<style>
.generate {
  box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.38);
  margin: 1em 0;
  transition: all 0.2s;
  animation: float 4s ease-in-out infinite;
  background: #313131;
}

.generate:hover {
  background: white;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0px);
  }
}
</style>
