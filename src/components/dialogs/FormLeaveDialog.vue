<template>
  <ConfirmDialog
    :value="value"
    cancelText="Stay"
    confirmText="Leave"
    title="Unsaved Changes"
    @cancel="onClose(false)"
    @confirm="onClose(true)"
    @input="(val) => $emit('input', val)"
  >
    There are unsaved changes that will be lost if you continue!
  </ConfirmDialog>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";

@Component
export default class FormLeaveDialog extends Vue {
  @Prop({ default: false })
  value!: boolean;

  /**
   * Decide whether form can be left or not
   * @param   {boolean} leaving - Whether form can be left
   * @returns {boolean}         - Whether form should be left
   */
  @Emit("leave-form")
  onClose(leaving: boolean): boolean {
    return leaving;
  }
}
</script>
