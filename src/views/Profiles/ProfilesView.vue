<template>
  <PageLayout>
    <TitleBar title="Profiles">
      <template v-slot:actions>
        <v-btn color="primary" rounded to="/profiles/new">
          <v-icon left>mdi-plus</v-icon>Add
        </v-btn>
      </template>
    </TitleBar>
    <v-card class="profiles">
      <ProfileItem :profile="profileModule.defaultProfile" />
      <v-subheader>Custom Profiles</v-subheader>
      <fragment v-for="profile in customProfiles" :key="profile.code">
        <v-divider />
        <ProfileItem :profile="profile" />
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
import { Profiles as ProfilesType } from "@typings/models";

// Utilities
import { ProfileModule } from "@store/modules";

@Component({
  components: {
    ProfileItem,
  },
})
export default class ProfilesView extends Vue {
  profileModule = getModule(ProfileModule, this.$store);

  // NOTE: Default profile is manually rendered (to always be at top!)
  get customProfiles(): ProfilesType {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { default: _, ...others } = this.profileModule.profiles;
    return others;
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
