<template>
  <PageLayout title="Balancing">
    <FormLeaveDialog v-model="isFormGuardActive" @leave-form="onFormLeave" />
    <ExpandableSection
      subtitle="Modify storage building capacities"
      title="Storage"
    >
      <ValidationObserver
        v-slot="{ valid: isValid }"
        ref="storageFormObserver"
        tag="form"
        @submit.prevent=""
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
          <v-btn :disabled="!storageForm.flags.changed" text @click="onCancel">
            Cancel
          </v-btn>
          <v-btn
            :disabled="true || !isValid || !storageForm.flags.changed"
            color="primary"
          >
            Save
          </v-btn>
        </ActionBar>
      </ValidationObserver>
    </ExpandableSection>
  </PageLayout>
</template>

<script lang="ts">
import { createForm, FormGuardMixin } from "@kendallroth/vue-simple-forms";
import { Component, Mixins, Ref } from "vue-property-decorator";
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
export default class Balancing extends Mixins(FormGuardMixin) {
  @Ref()
  readonly storageFormObserver!: InstanceType<typeof ValidationObserver>;

  storageForm = createForm(storageFormFields);
  guardedForms = [this.storageForm];

  storageQuantityValues = [50, 100, 200, 400];

  onCancel(): void {
    this.storageForm.reset();
    this.storageFormObserver.reset();
  }
}
</script>
