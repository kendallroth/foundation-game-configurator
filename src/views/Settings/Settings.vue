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
    <div class="text-h4">Settings</div>
    <ValidationObserver
      v-slot="{ valid: isValid }"
      ref="settingsFormObserver"
      tag="form"
      @submit.prevent=""
    >
      <ExpandableSection class="mt-5" title="Configurator Settings">
        <v-row>
          <v-col>
            <TextField
              v-model="settingsForm.fields.modPath"
              :disabled="settingsForm.flags.disabled"
              hint="Foundation configurator mod directory"
              label="Mod Path"
              name="modPath"
              persistent-hint
              rules="required"
            />
          </v-col>
          <v-col />
        </v-row>
        <ActionBar class="mt-0" right>
          <v-btn text @click="onCancel">Cancel</v-btn>
          <v-btn :disabled="!isValid" color="primary">Save</v-btn>
        </ActionBar>
      </ExpandableSection>
    </ValidationObserver>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  FormCreateMixin,
  FormLeaveGuardMixin,
  // @ts-ignore
} from "@kendallroth/vue-simple-forms";
import { ValidationObserver } from "vee-validate";

// Components
import { ExpandableSection } from "@components/layout";

const settingsFormFields = {
  modPath: "",
};

@Component({
  components: {
    ExpandableSection,
    ValidationObserver,
  },
  mixins: [
    FormCreateMixin("settingsForm", settingsFormFields),
    FormLeaveGuardMixin(["settingsForm"]),
  ],
})
export default class Settings extends Vue {
  onCancel(): void {
    // @ts-ignore
    this.settingsForm.reset();
    // @ts-ignore
    this.$refs.settingsFormObserver.reset();
  }
}
</script>
