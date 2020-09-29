<template>
  <v-expansion-panels :value="0">
    <v-expansion-panel>
      <v-expansion-panel-header class="section__header">
        <template v-slot:default="{}">
          <div>
            <div class="section__header__title">
              {{ title }}
            </div>
            <div v-if="subtitle" class="section__header__subtitle">
              {{ subtitle }}
            </div>
          </div>
        </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content eager>
        <slot name="default" />
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  props: {
    subtitle: {
      default: null,
      type: String,
    },
    title: {
      required: true,
      type: String,
    },
  },
})
export default class ExpandableSection extends Vue {}
</script>

<style lang="scss" scoped>
.section__header {
  border-bottom: 1px solid lightgrey;
}

.section__header__subtitle {
  color: grey;
}

.section__header__title {
  margin-bottom: 12px;
  font-size: 1.15rem;
  font-weight: 500;
}
</style>
