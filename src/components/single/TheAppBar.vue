<template>
  <v-app-bar app color="transparent" flat height="80">
    <v-avatar class="elevation-1" rounded>
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
</template>

<style lang="scss" scoped>
.appbar__title {
  margin-left: 16px;
  font-weight: 300;
}
</style>
