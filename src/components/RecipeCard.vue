<template>
  <div class="card mb-2 md:ml-2">
    <div class="card-image">
      <img :src="picture" />
    </div>
    <div class="card-description">
      <h3 class="font-robotocon mb-2 font-normal">{{ title }}</h3>
      <p class="font-roboto opacity-75">
        {{ description.slice(0, 98) + ".." }}
      </p>
      <router-link :to="'/recipe/' + id"
        ><button class="mt-2 font-roboto">read more..</button></router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "description", "picture", "id"]
};
</script>

<style>
.card {
  width: 300px;
  height: 500px;
  border: 1px #a9a9a9 solid;
  border-radius: 3px;
}

.card-image {
  width: 100%;
  height: 20em;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: fill;
}

.card-description {
  width: 100%;
  height: 8em;
  border-top: 1px #a9a9a9 solid;

  padding: 8px;
}

.card-description button {
  border: 1px #707070 solid;
  color: #479cf1;
  padding: 0.3em 0.75em;

  transition: all 0.1s;
}

.card-description button:hover {
  opacity: 0.8;
}
</style>
