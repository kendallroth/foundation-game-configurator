<template>
  <v-list-item :disabled="disabled" class="list__item" link :to="to">
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
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  props: {
    active: {
      default: false,
      type: Boolean,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    icon: {
      default: null,
      type: String,
    },
    subtitle: {
      default: null,
      type: String,
    },
    title: {
      required: true,
      type: String,
    },
    to: {
      required: true,
      type: String,
    },
  },
})
export default class DrawerLink extends Vue {}
</script>

<style lang="scss" scoped>
.list__item {
  padding-left: 16px !important; // Vuetify override

  i {
    font-size: 30px;
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
}
</style>
