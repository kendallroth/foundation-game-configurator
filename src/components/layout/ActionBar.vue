<template>
  <div
    :class="{
      'action-bar--right': right,
      'action-bar--left': left,
    }"
    class="action-bar"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  props: {
    left: {
      default: false,
      type: Boolean,
    },
    right: {
      default: true,
      type: Boolean,
    },
  },
})
export default class ActionBar extends Vue {}
</script>

<style lang="scss" scoped>
$btn-spacing: 8px;

.action-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 16px;

  &.action-bar--right {
    justify-content: flex-end;

    .v-btn:not(:last-child),
    .v-menu:not(:last-child) {
      margin-right: $btn-spacing;
    }
  }

  &.action-bar--left {
    justify-content: flex-start;

    .v-btn:not(:first-child),
    .v-menu:not(:first-child) {
      margin-left: $btn-spacing;
    }
  }
}
</style>
