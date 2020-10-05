<template>
  <v-expansion-panels :value="closed ? -1 : 0">
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
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ExpandableSection extends Vue {
  /**
   * Whether section is closed by default
   */
  @Prop({ default: false })
  closed!: boolean;

  /**
   * Section subtitle
   */
  @Prop({ default: null })
  subtitle!: string;

  /**
   * Section title
   */
  @Prop({ required: true })
  title!: string;
}
</script>

<style lang="scss" scoped>
.section__header {
  border-bottom: 1px solid lightgrey;
}

.section__header__subtitle {
  margin-top: 12px;
  color: grey;
}

.section__header__title {
  font-size: 1.15rem;
  font-weight: 500;
}
</style>
