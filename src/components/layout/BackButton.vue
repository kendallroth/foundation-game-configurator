<template>
  <v-btn text v-bind="$attrs" @click="$router.back()">
    <v-icon left>mdi-arrow-left</v-icon>
    Back
  </v-btn>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

/**
 * Standard back button
 */
@Component
export default class BackButton extends Vue {}
</script>
