<template>
  <div class="home h-screen flex items-center justify-center">
    <img
      src="@/assets/imgs/splash.jpg"
      alt="Fork"
      class="hidden lg:block w-1/3 h-full"
    />
    <div class="wrapper text-2xl w-screen px-16">
      <h1 class="w-1 font-montserrat font-bold pb-4">Simple. Easy. Recipes.</h1>
      <p class="font-roboto text-lg text-custom-black pb-4">
        Start viewing easy to make meals today.
      </p>
      <router-link to="/meals">
        <button
          class="px-8 py-3 bg-custom-green no-underline text-white font-montserrat font-bold text-lg"
        >
          View Recipes
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",

  created() {
    this.$store.commit("clearLoadedRecipes"); // Clear any stored recipes upon loading home page
  }
};
</script>

<style>
button.bg-custom-green {
  transition: all 0.1s;
}
button.bg-custom-green:hover {
  opacity: 0.8;
}
</style>
