<template>
  <PageLayout>
    <TitleBar title="Profiles">
      <template v-slot:actions>
        <v-btn color="primary" rounded to="/profiles/new">
          <v-icon left>mdi-plus</v-icon>Add
        </v-btn>
      </template>
    </TitleBar>
    <ConfirmDialog
      :value="Boolean(profileToSetCurrent)"
      title="Change Current Profile"
      @cancel="profileSetCurrentCancel"
      @confirm="profileSetCurrent"
    >
      Are you sure you want to change the current profile?
    </ConfirmDialog>
    <ConfirmDialog
      :value="Boolean(profileToDelete)"
      title="Delete Profile"
      @cancel="profileDeleteCancel"
      @confirm="profileDelete"
    >
      Are you sure you want to delete this profile?
    </ConfirmDialog>
    <v-card class="profiles">
      <ProfileItem
        :changeable="false"
        :profile="profileModule.defaultProfile"
        @prompt-delete="profileDeletePrompt"
        @set-default="profileSetCurrentPrompt"
      />
      <v-divider class="mt-4" />
      <v-subheader>Custom Profiles</v-subheader>
      <fragment
        v-for="(profile, key, idx) in customProfiles"
        :key="profile.code"
      >
        <v-divider v-if="idx > 0" />
        <ProfileItem
          :profile="profile"
          @prompt-delete="profileDeletePrompt"
          @set-default="profileSetCurrentPrompt"
        />
      </fragment>
      <div v-if="!Object.keys(customProfiles).length" class="text-body-1 px-4">
        There are no custom profiles!
      </div>
    </v-card>
  </PageLayout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";

// Components
import ProfileItem from "./ProfileItem.vue";

// Types
import { Profile, Profiles } from "@typings/models";

// Utilities
import { ProfileService } from "@services";
import { ProfileModule } from "@store/modules";

@Component({
  components: {
    ProfileItem,
  },
})
export default class ProfilesView extends Vue {
  profileModule = getModule(ProfileModule, this.$store);
  profileToSetCurrent: Profile | null = null;
  profileToDelete: Profile | null = null;

  // NOTE: Default profile is manually rendered (to always be at top!)
  get customProfiles(): Profiles {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { default: _, ...others } = this.profileModule.profiles;
    return others;
  }

  profileSetCurrent() {
    if (!this.profileToSetCurrent) return;
    ProfileService.setCurrentProfile(this.profileToSetCurrent.code);
    this.profileToSetCurrent = null;
  }

  profileSetCurrentCancel() {
    this.profileToSetCurrent = null;
  }

  profileSetCurrentPrompt(profile: Profile): void {
    this.profileToSetCurrent = profile;
  }

  profileDelete(profile: Profile) {
    if (!this.profileToDelete) return;
    // TODO
    this.$notifyWarning("Not implemented yet");
    this.profileToDelete = null;
  }

  profileDeleteCancel() {
    this.profileToDelete = null;
  }

  profileDeletePrompt(profile: Profile): void {
    this.profileToDelete = profile;
  }
}
</script>

<style lang="scss" scoped>
.profiles {
  padding: 12px 0;
}

.profile__actions {
  display: flex;
  flex-direction: row;
}

.profile__title {
  display: flex;
  align-items: center;
}

.profile__title--current {
  font-weight: 500;
}
</style>
