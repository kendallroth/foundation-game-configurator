<template>
  <header :class="{}" class="title-bar">
    <div :class="titleClass" class="title-bar__content">
      <div
        :class="{
          'text-h4': type === 'page',
          'text-h5': type === 'section',
        }"
        class="title-bar__title"
      >
        {{ title }}
      </div>
      <div class="title-bar__actions">
        <BackButton v-if="back" :class="{ 'mr-4': $slots.actions }" rounded />
        <slot name="actions" />
      </div>
    </div>
    <div v-if="subtitle" :class="subtitleClass" class="title-bar__subtitle">
      {{ subtitle }}
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class TitleBar extends Vue {
  /**
   * Whether backwards navigation is enabled
   */
  @Prop({ default: false })
  back!: boolean;

  @Prop({ default: null })
  subtitle!: string;

  @Prop({ default: null })
  subtitleClass!: string;

  @Prop({ required: true })
  title!: string;

  @Prop({ default: null })
  titleClass!: string;

  @Prop({ default: "page" })
  type!: "page" | "section";
}
</script>

<style lang="scss" scoped>
.title-bar {
  margin-bottom: 16px;
}

.title-bar__actions {
  margin-left: auto;
}

// Title bar content (title/actions)
.title-bar__content {
  display: flex;
}

.title-bar__subtitle {
  margin-top: 8px;
}
</style>
