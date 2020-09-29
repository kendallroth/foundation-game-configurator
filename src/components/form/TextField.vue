<template>
  <ValidationProvider
    v-slot="{ errors }"
    :name="vname || $attrs.label"
    :rules="rules"
    :vid="vid || $attrs.name"
    slim
  >
    <v-text-field
      ref="textField"
      v-model="innerValue"
      :append-icon="appendIcon"
      :dense="false"
      :error-messages="errors"
      :type="type"
      outlined
      @click:append="onVisibilityClick"
      COMMENT="Bind these last to enable overriding"
      v-bind="$attrs"
      v-on="$listeners"
    />
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from "vee-validate";

// Utilities
import {
  commonData,
  commonLifecycle,
  commonProps,
  commonWatch,
} from "./common";

/**
 * Vuetify wrapper (with validation)
 */
export default {
  name: "TextField",
  components: {
    ValidationProvider,
  },
  props: {
    ...commonProps,
  },
  data() {
    return {
      ...commonData,
      isVisible: true,
    };
  },
  computed: {
    appendIcon() {
      if (!this.hasVisibility) return null;

      return this.isVisible ? "mdi-eye" : "mdi-eye-off";
    },
    // Only password-type fields can have a visibility toggle
    hasVisibility() {
      return this.$attrs.type === "password";
    },
    type() {
      if (!this.hasVisibility) return this.$attrs.type;

      return this.isVisible ? "text" : "password";
    },
  },
  watch: {
    ...commonWatch,
  },
  created() {
    commonLifecycle.created(this);

    if (this.hasVisibility) {
      this.isVisible = false;
    }
  },
  methods: {
    /**
     * Focus on the field
     */
    focus() {
      return this.$refs.textField.$refs.input.focus();
    },
    /**
     * Toggle the field visibility
     */
    onVisibilityClick() {
      if (!this.hasVisibility) return;

      this.isVisible = !this.isVisible;
    },
  },
};
</script>
