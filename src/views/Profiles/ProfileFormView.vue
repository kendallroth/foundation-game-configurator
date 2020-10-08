<template>
  <PageLayout back :title="adding ? 'Add Profile' : 'Edit Profile'">
    <FormLeaveDialog v-model="isFormGuardActive" @leave-form="onFormLeave" />
    <v-card class="profile-details">
      <ValidationObserver
        v-slot="{ valid: isValid }"
        ref="profileFormObserver"
        tag="form"
        @submit.prevent=""
      >
        <v-row>
          <v-col>
            <TextField
              v-model="profileForm.fields.name"
              :disabled="profileForm.flags.disabled"
              label="Name"
              name="profileName"
              rules="required|min:4"
            />
          </v-col>
          <v-col>
            <TextField
              v-model="profileForm.fields.code"
              :disabled="profileForm.flags.disabled"
              hint="Identifying code (no spaces)"
              label="Code"
              name="profileCode"
              persistentHint
              rules="required|min:4"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <TextField
              v-model="profileForm.fields.description"
              :disabled="profileForm.flags.disabled"
              clearable
              label="Description"
              name="profileDescription"
            />
          </v-col>
        </v-row>

        <ActionBar class="mt-0" right>
          <v-btn :disabled="!profileForm.flags.changed" text @click="onCancel">
            Cancel
          </v-btn>
          <v-btn
            :disabled="true || !isValid || !profileForm.flags.changed"
            color="primary"
          >
            {{ adding ? "Add" : "Save" }}
          </v-btn>
        </ActionBar>
      </ValidationObserver>
    </v-card>
  </PageLayout>
</template>

<script lang="ts">
import { createForm, FormGuardMixin } from "@kendallroth/vue-simple-forms";
import { Component, Mixins, Prop, Ref } from "vue-property-decorator";
import { ValidationObserver } from "vee-validate";
import { getModule } from "vuex-module-decorators";

// Components
import { ExpandableSection } from "@components/layout";

// Utilities
import { ProfileModule } from "@store/modules";

const profileFormFields = {
  code: "",
  description: "",
  name: "",
};

@Component({
  components: {
    ExpandableSection,
    ValidationObserver,
  },
})
export default class ProfileFormView extends Mixins(FormGuardMixin) {
  /**
   * Whether empty form should be displayed
   */
  @Prop()
  adding!: boolean;

  @Ref()
  readonly profileFormObserver!: InstanceType<typeof ValidationObserver>;

  profileModule = getModule(ProfileModule, this.$store);

  profileForm = createForm(profileFormFields);
  guardedForms = [this.profileForm];

  mounted() {
    if (this.adding) return;

    const { code } = this.$route.params;
    if (!code || code === "default") {
      this.$router.back();
    }

    const profile = this.profileModule.profiles[code];
    if (!profile) {
      this.$router.back();
    }

    this.profileForm.setInitial({
      code: profile.code || "",
      description: profile.description || "",
      name: profile.name || "",
    });
  }

  onCancel(): void {
    this.profileForm.reset();
    this.profileFormObserver.reset();
  }
}
</script>

<style lang="scss" scoped>
.profile-details {
  padding: 16px;
}
</style>
