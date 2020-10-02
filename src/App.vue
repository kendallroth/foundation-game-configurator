<template>
  <v-app>
    <TheAppBar />

    <v-main class="app__main">
      <TheAppDrawer />
      <div class="app__content">
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import "reflect-metadata";
import { Component, Vue } from "vue-property-decorator";

// Components
import TheAppBar from "@components/single/TheAppBar.vue";
import TheAppDrawer from "@components/single/TheAppDrawer";

@Component({
  components: {
    TheAppBar,
    TheAppDrawer,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss" scoped>
.app__main,
.app__content {
  flex-grow: 1;
}
</style>

<style lang="scss">
// Style inner Vuetify v-main wrapper
.app__main > div {
  display: flex;
  flex-direction: row;
}
</style>
