<template>
  <v-container>
    <div class="text-h4">Balancing</div>
    <ExpandableSection
      class="mt-5"
      subtitle="Modify storage building capacities"
      title="Storage"
    >
      <v-row>
        <v-col>
          <v-select
            :items="storageQuantityValues"
            filled
            label="Warehouse Capacity"
          />
        </v-col>
        <v-col>
          <v-select
            :items="storageQuantityValues"
            filled
            label="Granary Capacity"
          />
        </v-col>
        <v-col />
      </v-row>
      <ActionBar class="mt-0" right>
        <v-btn text>Cancel</v-btn>
        <v-btn color="primary">Save</v-btn>
      </ActionBar>
    </ExpandableSection>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

// Components
import { ExpandableSection } from "@components/layout";

@Component({
  components: {
    ExpandableSection,
  },
})
export default class Balancing extends Vue {
  storageQuantityValues = [50, 100, 200, 400];
}
</script>
