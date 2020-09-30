<template>
  <v-navigation-drawer
    :mini-variant="false"
    class="drawer"
    color="blue darken-2"
    dark
    floating
    mini-variant-width="70"
    permanent
  >
    <v-list class="drawer__list" nav shaped>
      <DrawerLink
        disabled
        icon="mdi-account"
        subtitle="Default"
        title="Profiles"
        to="/profiles"
      />
      <v-divider class="mb-2" />

      <v-tooltip
        v-for="item in menuItems"
        :key="item.icon"
        disabled
        nudge-right="4"
        open-delay="250"
        right
      >
        <template v-slot:activator="{ attrs, on }">
          <DrawerLink
            v-bind="attrs"
            v-on="on"
            :disabled="item.disabled"
            :exact="item.url === '/'"
            :icon="item.icon"
            :title="item.title"
            :to="item.url"
          />
        </template>
        <span>{{ item.title }}</span>
      </v-tooltip>
    </v-list>

    <template v-slot:append>
      <div class="drawer__version">
        {{ versionString }}
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

// Components
import DrawerLink from "./DrawerLink.vue";

// Utilities
import config from "@config";

@Component({
  components: {
    DrawerLink,
  },
})
export default class TheAppDrawer extends Vue {
  version: string = config.version;

  menuItems = [
    {
      icon: "mdi-view-dashboard",
      title: "Dashboard",
      url: "/",
    },
    {
      icon: "mdi-scale-balance",
      title: "Balancing",
      url: "/balancing",
    },
    { disabled: true, icon: "mdi-home", title: "Buildings", url: "/buildings" },
    { disabled: true, icon: "mdi-currency-usd", title: "Trade", url: "/trade" },
    { icon: "mdi-cog", title: "Settings", url: "/settings" },
  ];

  get versionString(): string {
    return `v${this.version}`;
  }
}
</script>

<style lang="scss" scoped>
.drawer {
  flex-shrink: 0;
  border-top-right-radius: 24px;
}

.drawer__list {
  padding: 32px 0;
}

.drawer__version {
  padding: 16px;
  font-size: 0.9rem;
  font-weight: 300;
  color: white;
  opacity: 0.8;
}
</style>
