<template>
  <div class="app-loader">
    <div class="app-loader__content">
      <v-img
        :maxWidth="$vuetify.breakpoint.sm ? 300 : 500"
        :maxHeight="$vuetify.breakpoint.sm ? 270 : 400"
        :src="require('@assets/images/app_loader.svg')"
        contain
      />
      <v-progress-linear
        :height="8"
        class="app-loader__progress"
        indeterminate
      />
      <div class="app-loader__text text-h4">
        Loading
        <span class="app-loader__text__dots">...</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Vue } from "vue-property-decorator";

// Utilities
import { SettingsService } from "@services";

@Component
export default class TheAppLoader extends Vue {
  /**
   * Application loaded event
   */
  @Emit("loaded")
  onLoaded() {
    return true;
  }

  mounted() {
    SettingsService.loadModPath();

    // DEBUG
    setTimeout(() => {
      this.onLoaded();
    }, 1500);
  }
}
</script>

<style lang="scss" scoped>
.app-loader {
  display: flex;
  flex-direction: column;
  // Expand to fill parent (ie. page)
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  margin-bottom: 100px;
}

.app-loader__content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.app-loader__progress {
  top: -1px;
}

.app-loader__text {
  position: relative;
  width: fit-content;
  margin-top: 24px;
  text-align: center;

  .app-loader__text__dots {
    position: absolute;
    left: 100%;
  }
}
</style>
