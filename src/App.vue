<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <RouterView />
</template>

<style lang="scss">

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  background: linear-gradient(90deg, #e17afe 0%, #9baaff 100%);
  font-family: $font-family;
}

ul {
  list-style: none;
}

input {
  outline: none;
  border: none;
  background-image: none;
  background-color: transparent;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
}

button {
  border: none;
  padding: 0;
  background: transparent;
  cursor: pointer;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #fff;
  margin: 20px;
  max-height: 900px;
}
</style>
