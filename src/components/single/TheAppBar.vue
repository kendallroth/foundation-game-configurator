<template>
  <v-app-bar app class="appbar" color="transparent" flat height="80">
    <v-avatar class="elevation-1" rounded>
      <v-img :src="require('@assets/logo.png')" />
    </v-avatar>
    <v-toolbar-title class="appbar__title">
      Foundation Configurator
    </v-toolbar-title>
    <v-spacer />
    <v-tooltip v-if="!settingsModule.hasModPath" bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-icon class="mr-4" color="warning" v-bind="attrs" v-on="on">
          mdi-folder-alert
        </v-icon>
      </template>
      <span>No mod path</span>
    </v-tooltip>
    <v-chip color="primary" disabled outlined @click="() => {}">
      <v-avatar left>
        <v-icon>mdi-account-circle</v-icon>
      </v-avatar>
      {{ profileModule.profileName }}
    </v-chip>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";

// Utilities
import { ProfileModule, SettingsModule } from "@store/modules";

@Component
export default class TheAppBar extends Vue {
  profileModule = getModule(ProfileModule, this.$store);
  settingsModule = getModule(SettingsModule, this.$store);
}
</script>

<style lang="scss" scoped>
.appbar {
  // Align with normal page content
  padding-right: 8px;
}

.appbar__title {
  margin-left: 16px;
  font-weight: 300;
}
</style>
