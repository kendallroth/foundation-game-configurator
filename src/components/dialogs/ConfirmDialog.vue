<template>
  <v-row justify="center">
    <v-dialog
      :value="value"
      max-width="400"
      persistent
      width="350"
      v-bind="$attrs"
      @input="(val) => $emit('input', val)"
    >
      <v-card>
        <v-card-title class="headline">{{ title }}</v-card-title>
        <v-card-text>
          <slot name="default" />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" small text @click="onCancel">
            {{ cancelText }}
          </v-btn>
          <v-btn color="error" small text @click="onConfirm">
            {{ confirmText }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  props: {
    /**
     * Cancel button text
     */
    cancelText: {
      type: String,
      default: "No",
    },
    /**
     * Confirm button text
     */
    confirmText: {
      type: String,
      default: "Yes",
    },
    /**
     * Dialog title
     */
    title: {
      type: String,
      required: true,
    },
    /**
     * Whether the dialog is shown
     */
    value: {
      type: Boolean,
      required: true,
    },
  },
})
export default class ConfirmDialog extends Vue {
  /**
   * Cancel handler
   */
  onCancel() {
    this.$emit("input", false);
    this.$emit("cancel");
  }

  /**
   * Confirm handler
   */
  onConfirm() {
    this.$emit("input", false);
    this.$emit("confirm");
  }
}
</script>
