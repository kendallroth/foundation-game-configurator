<template>
  <v-app>
    <TheAppBar />

    <v-main class="app__main">
      <TheAppDrawer :loading="isLoading" />
      <TheAppLoader
        v-if="isLoading"
        class="app__loading__loader"
        @loaded="isLoading = false"
      />
      <div v-else class="app__content">
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import "reflect-metadata";
import { Component, Vue } from "vue-property-decorator";

// Components
import { TheAppBar, TheAppDrawer, TheAppLoader } from "@components/single";

@Component({
  components: {
    TheAppBar,
    TheAppDrawer,
    TheAppLoader,
  },
})
export default class App extends Vue {
  isLoading = true;
}
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
