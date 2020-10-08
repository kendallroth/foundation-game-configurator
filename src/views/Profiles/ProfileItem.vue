<template>
  <v-list-item :class="{ 'blue lighten-5': profile.current }" class="profile">
    <v-list-item-content>
      <v-list-item-title class="profile__title">
        <span :class="{ 'profile__title--current': profile.current }">
          {{ profile.name }}
        </span>
        <v-icon v-if="profile.current" class="ml-1" color="primary" size="16">
          mdi-star
        </v-icon>
      </v-list-item-title>
      <v-list-item-subtitle>
        {{ profile.description }}
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action class="profile__actions">
      <v-btn v-if="!profile.current" icon>
        <v-icon color="primary">mdi-star</v-icon>
      </v-btn>
      <v-btn :disabled="profile.current" :to="`/profiles/${profile.code}`" icon>
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn :disabled="profile.current" icon>
        <v-icon color="red">mdi-delete</v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

// Types
import { Profile } from "@typings/models";

@Component
export default class ProfileItem extends Vue {
  @Prop({ required: true })
  profile!: Profile;
}
</script>

<style lang="scss" scoped>
.profile {
  border-radius: 0 !important; // Vuetify card item override
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
