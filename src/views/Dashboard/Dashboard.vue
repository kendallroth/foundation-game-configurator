<template>
  <v-container>
    <v-alert
      v-if="!settingsModule.hasModPath"
      class="dashboard__alert"
      border="left"
      icon="mdi-alert"
      type="warning"
    >
      No mod path has been configured!
      <v-btn text>Configure</v-btn>
    </v-alert>
    <div class="empty-indicator">
      <v-img
        :src="require('@assets/images/undraw_under_construction.svg')"
        class="mb-8"
        maxHeight="300"
        maxWidth="500"
      />
      <div class="text-h2 text-center">Coming Soon!</div>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";

// Utilities
import { SettingsModule } from "@store/modules";

// const settingsModule = getModule(SettingsModule);

@Component
export default class Dashboard extends Vue {
  settingsModule = getModule(SettingsModule, this.$store);

  /*get hasModPath(): boolean {
    return settingsModule.hasModPath;
  }*/
}
</script>

<style lang="scss" scoped>
.empty-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 48px;
}
</style>

<style lang="scss">
.dashboard__alert {
  .v-alert__content {
    display: flex;
    align-items: center;
  }
  .v-btn {
    margin-left: auto;
  }
  .v-icon {
    align-self: center;
  }
}
</style>
