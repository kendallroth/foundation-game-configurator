<template>
  <v-snackbar
    :value="snackbar.visible"
    :color="snackbar.type"
    :timeout="snackbar.timeout"
    bottom
    left
    @input="close"
  >
    {{ snackbar.text }}
    <template v-slot:action>
      <v-btn
        v-if="hasButton"
        :icon="Boolean(snackbar.buttonIcon)"
        color="white"
        flat
        @click="snackbar.onClick"
      >
        <v-icon v-if="snackbar.buttonIcon">
          {{ snackbar.buttonIcon }}
        </v-icon>
        <template v-else-if="snackbar.buttonText">
          {{ snackbar.buttonText }}
        </template>
      </v-btn>
      <v-btn
        v-if="snackbar.closeable"
        class="button--close"
        icon
        @click="close"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

// Types
import { Snackbar } from "@typings/app";

// Utilities
import { snackbarStore } from "@plugins/snackbar";

// Default snackbar duration
const SNACKBAR_DURATION = 4000;

@Component
export default class TheAppSnackbar extends Vue {
  get hasButton() {
    const { buttonIcon, buttonText, onClick } = this.snackbar;
    return (buttonIcon || buttonText) && onClick;
  }

  get snackbar(): Snackbar {
    const {
      buttonIcon = null,
      buttonText = null,
      closeable = false,
      onClick,
      permanent = false,
      text = "",
      timeout = SNACKBAR_DURATION,
      type = null,
      visible,
    } = snackbarStore;

    return {
      buttonIcon,
      buttonText,
      // Snackbars are always closeable if permanent
      closeable: permanent || closeable,
      text,
      timeout: permanent ? -1 : timeout,
      type,
      visible,
      onClick: onClick
        ? () => {
            onClick();
            this.close();
          }
        : undefined,
    };
  }

  close(): void {
    this.$notifyClose();
  }
}
</script>
