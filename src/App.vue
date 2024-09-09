<template>

  <NavbarComponents  v-if = "$route.path !== '/'" />


  <HeroComponents  v-if = "$route.path !== '/'"  />

  <router-view/>

  <FooterComponents />

</template>

<script setup >

import NavbarComponents from './components/NavbarComponents.vue';
import HeroComponents from './components/HeroComponents.vue';
import FooterComponents from './components/FooterComponents.vue';

</script>


<style>
 
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

</style>
