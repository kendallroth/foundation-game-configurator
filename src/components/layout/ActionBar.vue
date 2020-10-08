<template>
  <div class="action-bar">
    <!-- NOTE: Display default "left" if left is specified (since right is default) -->
    <div v-if="$slots.left || left" class="action-bar__left">
      <slot v-if="$slots.left" name="left" />
      <slot v-else name="default" />
    </div>
    <!-- NOTE: Only display default "right" if no left is specified (since right is default) -->
    <div v-if="$slots.right || (right && !left)" class="action-bar__right">
      <slot v-if="$slots.right" name="right" />
      <slot v-else name="default" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ActionBar extends Vue {
  @Prop({ default: false })
  left!: boolean;

  @Prop({ default: true })
  right!: boolean;
}
</script>

<style lang="scss" scoped>
$btn-spacing: 8px;

.action-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 16px;
}

.action-bar__left {
  margin-right: auto;

  .v-btn:not(:first-child),
  .v-menu:not(:first-child) {
    margin-left: $btn-spacing;
  }
}

.action-bar__right {
  margin-left: auto;

  .v-btn:not(:last-child),
  .v-menu:not(:last-child) {
    margin-right: $btn-spacing;
  }
}
</style>
