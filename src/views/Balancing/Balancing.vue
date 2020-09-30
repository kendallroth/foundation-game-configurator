<template>
  <v-container>
    <FormLeaveDialog
      v-model="isLeaveFormActive"
      @leave-form="(val) => formLeaveCallback(val)"
    />
    <div class="text-h4">Balancing</div>
    <ValidationObserver
      v-slot="{ valid: isValid }"
      ref="balancingFormObserver"
      tag="form"
      @submit.prevent=""
    >
      <ExpandableSection
        class="mt-5"
        subtitle="Modify storage building capacities"
        title="Storage"
      >
        <v-row>
          <v-col>
            <SelectField
              v-model="storageForm.fields.warehouseCapacity"
              :disabled="storageForm.flags.disabled"
              :items="storageQuantityValues"
              label="Warehouse Capacity"
              name="warehouseCapacity"
              rules="required"
            />
          </v-col>
          <v-col>
            <SelectField
              v-model="storageForm.fields.granaryCapacity"
              :disabled="storageForm.flags.disabled"
              :items="storageQuantityValues"
              label="Granary Capacity"
              name="granaryCapacity"
              rules="required"
            />
          </v-col>
          <v-col />
        </v-row>
        <ActionBar class="mt-0" right>
          <v-btn text>Cancel</v-btn>
          <v-btn :disabled="!isValid" color="primary">Save</v-btn>
        </ActionBar>
      </ExpandableSection>
    </ValidationObserver>
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import {
  FormCreateMixin,
  FormLeaveGuardMixin,
  // @ts-ignore
} from "@kendallroth/vue-simple-forms";
import { ValidationObserver } from "vee-validate";

// Components
import { ExpandableSection } from "@components/layout";

const storageFormFields = {
  granaryCapacity: 100,
  warehouseCapacity: 100,
};

@Component({
  components: {
    ExpandableSection,
    ValidationObserver,
  },
})
export default class Balancing extends Mixins(
  FormCreateMixin("storageForm", storageFormFields),
  FormLeaveGuardMixin(["storageForm"])
) {
  storageQuantityValues = [50, 100, 200, 400];
}
</script>
