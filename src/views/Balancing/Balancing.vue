<template>
  <v-container>
    <ConfirmDialog
      v-model="isLeaveFormActive"
      cancelText="Stay"
      confirmText="Leave"
      title="Unsaved Changes"
      @cancel="formLeaveCallback(false)"
      @confirm="formLeaveCallback(true)"
    >
      There are unsaved changes that will be lost if you continue!
    </ConfirmDialog>
    <div class="text-h4">Balancing</div>
    <ValidationObserver
      v-slot="{ valid: isValid }"
      ref="passwordFormObserver"
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
import Vue from "vue";
import Component from "vue-class-component";
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
  mixins: [
    FormCreateMixin("storageForm", storageFormFields),
    FormLeaveGuardMixin(["storageForm"]),
  ],
})
export default class Balancing extends Vue {
  storageQuantityValues = [50, 100, 200, 400];
}
</script>
