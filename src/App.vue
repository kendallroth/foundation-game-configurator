<template>
  <v-app>
    <TheAppDrawer />

    <v-app-bar app color="primary" dark>
      <v-toolbar-title class="appbar__title">
        Foundation Configurator
      </v-toolbar-title>
      <v-spacer />
      <v-btn disabled icon large>
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main class="content">
      <div class="text-h2 text-center">Coming Soon!</div>
    </v-main>
  </v-app>
</template>

<style lang="scss" scoped>
.content {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

// Components
import TheAppDrawer from "@components/single/TheAppDrawer.vue";

@Component({
  components: {
    TheAppDrawer,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss" scoped>
.appbar__title {
  font-weight: 300;
}
</style>
