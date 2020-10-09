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
import { Component } from "vue-property-decorator";

// Utilities
import CommonField from "./common";

/**
 * Vuetify wrapper (with validation)
 */

@Component({
  components: {
    ValidationProvider,
  },
})
class SelectField extends CommonField {
  /**
   * Focus on the field
   */
  focus() {
    return this.$refs.selectField.$refs.input.focus();
  }
}

export default SelectField;
</script>
