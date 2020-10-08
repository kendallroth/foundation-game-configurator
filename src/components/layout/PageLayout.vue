<template>
  <v-container class="layout__container">
    <TitleBar
      v-if="title"
      :back="back"
      :title="title"
      :titleClass="titleClass"
    />
    <slot />
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class PageLayout extends Vue {
  @Prop({ default: false })
  back!: boolean;

  @Prop({ default: null })
  title!: string;

  @Prop({ default: "" })
  titleClass!: string;
}
</script>

<style lang="scss" scoped>
.layout__container {
  padding: 12px 24px 24px;
}
</style>
