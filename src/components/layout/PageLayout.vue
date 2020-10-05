<template>
  <v-container class="layout__container">
    <div v-if="title" :class="[titleClass]" class="text-h4 mb-4">
      {{ title }}
    </div>
    <slot />
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class PageLayout extends Vue {
  @Prop({ default: null })
  title!: string;

  @Prop({ default: "" })
  titleClass!: string;
}
</script>

<style lang="scss" scoped>
.layout__container {
  padding: 0 24px 12px;
}
</style>
