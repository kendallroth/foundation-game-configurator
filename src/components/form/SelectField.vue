<template>
  <ValidationProvider
    v-slot="{ errors }"
    :name="vname || $attrs.label"
    :rules="rules"
    :vid="vid || $attrs.name"
    slim
  >
    <v-select
      ref="selectField"
      v-model="innerValue"
      :error-messages="errors"
      :menu-props="{ offsetY: true }"
      dense
      filled
      COMMENT2="Bind these last to enable overriding"
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
  name: "SelectField",
  components: {
    ValidationProvider,
  },
  props: {
    ...commonProps,
  },
  data() {
    return {
      ...commonData,
    };
  },
  watch: {
    ...commonWatch,
  },
  created() {
    commonLifecycle.created(this);
  },
  methods: {
    /**
     * Focus on the field
     */
    focus() {
      return this.$refs.selectField.$refs.input.focus();
    },
  },
};
</script>
