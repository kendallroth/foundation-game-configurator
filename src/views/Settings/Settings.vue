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
          <v-btn text @click="onCancel">Cancel</v-btn>
          <v-btn :disabled="!isValid" color="primary">Save</v-btn>
        </ActionBar>
      </ExpandableSection>
    </ValidationObserver>
  </v-container>
</template>

<script lang="ts">
import { ipcRenderer } from "electron";
import { createForm, FormGuardMixin } from "@kendallroth/vue-simple-forms";
import { Component, Mixins, Ref } from "vue-property-decorator";
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
})
export default class Settings extends Mixins(FormGuardMixin) {
  @Ref()
  readonly settingsFormObserver!: InstanceType<typeof ValidationObserver>;

  settingsForm = createForm(settingsFormFields);
  guardedForms = [this.settingsForm];

  onCancel(): void {
    this.settingsForm.reset();
    this.settingsFormObserver.reset();
  }

  async selectModDirectory(): Promise<void> {
    const result = await ipcRenderer.invoke("open-folder-dialog");
    if (!result) return;

    this.settingsForm.setValues({ modPath: result });
  }
}
</script>
