<template>
  <v-list-item
    :disabled="disabled"
    :exact="exact"
    :to="to"
    active-class="list__item--exact"
    class="list__item"
    exact-active-class="list__item--exact"
    link
  >
    <v-list-item-icon v-if="icon" class="list__item__icon">
      <v-icon>{{ icon }}</v-icon>
    </v-list-item-icon>
    <v-list-item-content class="list__item__content">
      <v-list-item-title>{{ title }}</v-list-item-title>
      <v-list-item-subtitle v-if="subtitle">
        {{ subtitle }}
      </v-list-item-subtitle>
    </v-list-item-content>
    <span class="list__item__indicator" />
  </v-list-item>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class DrawerLink extends Vue {
  @Prop({ default: false })
  disabled!: boolean;

  @Prop({ default: false })
  exact!: boolean;

  @Prop({ default: null })
  icon!: string;

  @Prop({ default: null })
  subtitle!: string;

  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  to!: string;
}
</script>

<style lang="scss" scoped>
.list__item {
  padding-left: 16px !important; // Vuetify override

  i {
    font-size: 30px;
  }
}

.list__item--exact {
  .list__item__indicator {
    opacity: 1;
  }
}

.list__item__indicator {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 5px;
  content: "";
  background-color: white;
  opacity: 0;
  transition: ease-in-out 0.15s opacity;
}
</style>
