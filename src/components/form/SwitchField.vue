<template>
  <ValidationProvider
    v-slot="{ errors }"
    :name="vname || $attrs.label"
    :rules="rules"
    :vid="vid || $attrs.name"
    slim
  >
    <v-switch
      v-model="innerValue"
      :error-messages="errors"
      inset
      COMMENT1="Bind these last to enable overriding"
      v-bind="$attrs"
      v-on="$listeners"
    />
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from "vee-validate";
import { Component } from "vue-property-decorator";

// Utilities
import CommonField from "./CommonField";

/**
 * Vuetify wrapper (with validation)
 */

@Component({
  components: {
    ValidationProvider,
  },
})
class SwitchField extends CommonField {}

export default SwitchField;
</script>
