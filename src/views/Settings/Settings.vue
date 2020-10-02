<template>
  <v-container>
    <FormLeaveDialog v-model="isFormGuardActive" @leave-form="onFormLeave" />
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
              append-icon="mdi-folder"
              hint="Foundation configurator mod directory"
              label="Mod Path"
              name="modPath"
              placeholder="/"
              persistent-hint
              readonly
              rules="required"
              @click:append="selectModDirectory"
            />
          </v-col>
        </v-row>
        <ActionBar class="mt-0" right>
          <v-btn :disabled="!settingsForm.flags.changed" text @click="onCancel">
            Cancel
          </v-btn>
          <v-btn
            :disabled="!isValid || !settingsForm.flags.changed"
            color="primary"
            @click="onSubmit"
          >
            Save
          </v-btn>
        </ActionBar>
      </ExpandableSection>
    </ValidationObserver>
  </v-container>
</template>

<script lang="ts">
import { ipcRenderer } from "electron";
import { createForm, FormGuardMixin } from "@kendallroth/vue-simple-forms";
import { FormFields as FormFieldsType } from "@kendallroth/vue-simple-forms/lib/createForm";
import { Component, Mixins, Ref } from "vue-property-decorator";
import { ValidationObserver } from "vee-validate";
import { getModule } from "vuex-module-decorators";

// Components
import { ExpandableSection } from "@components/layout";

// Utilities
import { SettingsModule } from "@store/modules";

const settingsFormFields: FormFields = {
  modPath: "",
};

interface FormFields extends FormFieldsType {
  modPath: string;
}

@Component({
  components: {
    ExpandableSection,
    ValidationObserver,
  },
})
export default class Settings extends Mixins(FormGuardMixin) {
  @Ref()
  readonly settingsFormObserver!: InstanceType<typeof ValidationObserver>;

  settingsModule = getModule(SettingsModule, this.$store);

  settingsForm = createForm(settingsFormFields);
  guardedForms = [this.settingsForm];

  mounted() {
    const values: FormFields = {
      modPath: this.settingsModule.modPath || "",
    };
    this.settingsForm = createForm(values);
  }

  onCancel(): void {
    this.settingsForm.reset();
    this.settingsFormObserver.reset();
  }

  onSubmit(): void {
    const values = this.settingsForm.getValues() as FormFields;

    this.settingsModule.setModPath(values.modPath);

    this.settingsForm.setInitial(values);
  }

  async selectModDirectory(): Promise<void> {
    const result = await ipcRenderer.invoke("open-folder-dialog");
    if (!result) return;

    this.settingsForm.setValues({ modPath: result });
  }
}
</script>
