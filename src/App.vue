<template>
  <div id="app">
    <div
      class="nav absolute w-full h-auto flex justify-end items-center p-2 sm:shadow-none shadow-md"
    >
      <router-link to="/">
        <img
          src="@/assets/imgs/easyMeals.png"
          alt="easyMeals"
          class="w-auto h-12 lg:h-16"
        />
      </router-link>
    </div>
    <div @click="buttonRedirect()" class="fixed pin-b pin-r m-4 cursor-pointer">
      <img
        :src="
          $route.name != 'favorites' && $route.name != 'recipe'
            ? icons.Heart
            : icons.Arrow
        "
        class="rounded-lg p-3 w-4/5 bg-custom-grey widget"
      />
    </div>
    <transition mode="out-in" name="fade">
      <router-view />
    </transition>
  </div>
</template>

<script>
import "@/assets/css/tailwind.css"; // Tailwind styles
import Heart from "@/assets/svgs/heart.svg"; // Heart icon for 'favorites' button
import Arrow from "@/assets/svgs/arrow.svg"; // Arrow icon for 'back' button

export default {
  data() {
    return {
      icons: { Heart, Arrow } // Making icons available to DOM
    };
  },
  methods: {
    buttonRedirect() {
      if (
        // If you're on the favorites page or recipe page, go back. Otherwise go to the favorites page
        this.$router.app._route.name == "favorites" ||
        this.$router.app._route.name == "recipe"
      ) {
        this.$router.go(-1);
      } else {
        this.$router.push({ path: "/favorites" });
      }
    }
  }
};
</script>

<style>
/* Roboto */
@import url("https://fonts.googleapis.com/css?family=Roboto");

/* Roboto Condensed */
@import url("https://fonts.googleapis.com/css?family=Roboto+Condensed");

/* Montserrat */
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,500,700");

* {
  margin: 0;
  padding: 0;
}

.widget {
  transition: all 0.4s;
  opacity: 0.6;
}

.widget:hover {
  opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.65s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
  transform: translateX(-500px);
}
</style>
