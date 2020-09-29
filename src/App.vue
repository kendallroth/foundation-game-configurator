<template>
  <v-app>
    <v-app-bar app color="transparent" flat height="80">
      <v-avatar rounded>
        <v-img :src="require('@assets/logo.png')" />
      </v-avatar>
      <v-toolbar-title class="appbar__title">
        Foundation Configurator
      </v-toolbar-title>
      <v-spacer />
      <v-btn disabled icon large>
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main class="app__main">
      <TheAppDrawer />
      <div class="app__content">
        <router-view />
      </div>
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
import TheAppDrawer from "@components/single/TheAppDrawer/index.vue";

@Component({
  components: {
    TheAppDrawer,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss" scoped>
.appbar__title {
  margin-left: 16px;
  font-weight: 300;
}

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
