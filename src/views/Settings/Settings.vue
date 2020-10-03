<template>
  <PageLayout title="Settings">
    <FormLeaveDialog v-model="isFormGuardActive" @leave-form="onFormLeave" />
    <ValidationObserver
      v-slot="{ valid: isValid }"
      ref="settingsFormObserver"
      tag="form"
      @submit.prevent=""
    >
      <ExpandableSection title="Configurator Settings">
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
          <v-btn
            :disabled="!settingsForm.flags.changed"
            text
            @click="settingsCancel"
          >
            Cancel
          </v-btn>
          <v-btn
            :disabled="!isValid || !settingsForm.flags.changed"
            color="primary"
            @click="settingsSubmit"
          >
            Save
          </v-btn>
        </ActionBar>
      </ExpandableSection>
      <ExpandableSection class="mt-5" closed title="Reset Data">
        <ConfirmDialog
          v-model="isResetAppDialogShown"
          title="Confirm Reset"
          @confirm="appClear"
        >
          Are you sure you want to reset the app data?
        </ConfirmDialog>
        <v-row>
          <v-col>
            <div class="">
              Reset the configurator by clearing the app data.
            </div>
            <v-alert class="mt-4" dense outlined type="info">
              This will not affect saved configuration profiles!
            </v-alert>
          </v-col>
        </v-row>
        <ActionBar class="mt-0" right>
          <v-btn
            :disabled="isResettingApp"
            :loading="isResettingApp"
            color="error"
            @click="isResetAppDialogShown = true"
          >
            Reset
          </v-btn>
        </ActionBar>
      </ExpandableSection>
    </ValidationObserver>
  </PageLayout>
</template>

<script lang="ts">
import { ipcRenderer } from "electron";
import { createForm, FormGuardMixin } from "@kendallroth/vue-simple-forms";
import { FormFields } from "@kendallroth/vue-simple-forms/lib/types";
import { Component, Mixins, Ref } from "vue-property-decorator";
import { ValidationObserver } from "vee-validate";
import { getModule } from "vuex-module-decorators";

// Components
import { ExpandableSection } from "@components/layout";

// Utilities
import { SettingsService } from "@services";
import { SettingsModule } from "@store/modules";

const settingsFormFields: SettingsFields = {
  modPath: "",
};

interface SettingsFields extends FormFields {
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

  isResetAppDialogShown = false;
  isResettingApp = false;

  settingsForm = createForm(settingsFormFields);
  guardedForms = [this.settingsForm];

  mounted() {
    const values: SettingsFields = {
      modPath: this.settingsModule.modPath || "",
    };
    this.settingsForm = createForm(values);
  }

  appClear(): void {
    this.isResettingApp = true;
    SettingsService.setModPath(null);

    // DEBUG
    setTimeout(() => {
      this.isResettingApp = false;

      this.settingsForm.setInitial({ modPath: null });
    }, 1000);
  }

  settingsCancel(): void {
    this.settingsForm.reset();
    this.settingsFormObserver.reset();
  }

  settingsSubmit(): void {
    const values = this.settingsForm.getValues() as SettingsFields;

    SettingsService.setModPath(values.modPath);

    this.settingsForm.setInitial(values);
  }

  async selectModDirectory(): Promise<void> {
    const result = await ipcRenderer.invoke("open-folder-dialog");
    if (!result) return;

    this.settingsForm.setValues({ modPath: result });
  }
}
</script>
