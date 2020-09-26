<template>
  <v-navigation-drawer
    app
    class="drawer"
    color="blue darken-4"
    dark
    floating
    mini-variant
    mini-variant-width="70"
    permanent
  >
    <v-list class="drawer__list" dense nav>
      <v-list-item class="px-0 my-1">
        <v-list-item-avatar rounded>
          <v-img :src="require('@assets/logo.png')" />
        </v-list-item-avatar>
      </v-list-item>
      <v-divider class="mb-2" />

      <v-tooltip
        v-for="item in menuItems"
        :key="item.icon"
        nudge-right="4"
        open-delay="250"
        right
      >
        <template v-slot:activator="{ attrs, on }">
          <v-list-item v-bind="attrs" v-on="on" class="list__item" link>
            <v-list-item-icon class="list__item__icon">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content class="list__item__content">
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
        <span>{{ item.text }}</span>
      </v-tooltip>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class TheAppDrawer extends Vue {
  menuItems = [
    { icon: "mdi-scale-balance", text: "Balancing", url: null },
    { icon: "mdi-home", text: "Buildings", url: null },
    { icon: "mdi-currency-usd", text: "Trade", url: null },
  ];
}
</script>

<style lang="scss" scoped>
// NOTE: This is set on the drawer itself!
$drawer-width: 70px;
$drawer-list-padding: 8px;
$drawer-icon-size: $drawer-width - $drawer-list-padding * 2;

.drawer__list {
  padding: 0 $drawer-list-padding;
}

.list__item {
  height: $drawer-icon-size;

  i {
    font-size: 30px;
  }
}

.list__item__icon,
.list__item__content {
  align-self: center;
}
</style>
