<template>
  <div
    :class="{
      'action-bar--right': !left,
      'action-bar--left': left,
    }"
    class="action-bar"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ActionBar extends Vue {
  @Prop({ default: false })
  left!: boolean;
}
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
