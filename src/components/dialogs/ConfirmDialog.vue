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
          <v-spacer />
          <v-btn color="primary" small text @click="onCancel">
            {{ cancelText }}
          </v-btn>
          <v-btn
            :disabled="disabled"
            color="error"
            small
            text
            @click="onConfirm"
          >
            {{ confirmText }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";

@Component
export default class ConfirmDialog extends Vue {
  /**
   * Cancel button text
   */
  @Prop({ default: "No " })
  cancelText!: string;

  /**
   * Confirm button text
   */
  @Prop({ default: "Yes " })
  confirmText!: string;

  /**
   * Whether the confirmation dialog is disabled
   */
  @Prop({ default: false })
  disabled!: boolean;

  /**
   * Dialog title
   */
  @Prop({ required: true })
  title!: string;

  /**
   * Whether the dialog is shown
   */
  @Prop({ required: true })
  value!: boolean;

  /**
   * Cancel handler
   */
  @Emit("input")
  @Emit("cancel")
  onCancel() {
    return false;
  }

  /**
   * Confirm handler
   */
  @Emit("input")
  @Emit("confirm")
  onConfirm() {
    return false;
  }
}
</script>
