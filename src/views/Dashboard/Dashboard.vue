<template>
  <div class="dashboard">
    <v-img
      :src="require('@assets/images/undraw_under_construction.svg')"
      class="mb-8"
      maxHeight="300"
      maxWidth="500"
    />
    <div class="text-h2 text-center">Coming Soon!</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class Dashboard extends Vue {}
</script>

<style lang="scss" scoped>
.dashboard {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
