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
      :append-icon="appendIconComputed"
      :error-messages="errors"
      :type="type"
      dense
      filled
      @click:append="onVisibilityClick"
      COMMENT="Bind these last to enable overriding"
      v-bind="$attrs"
      v-on="$listeners"
      @click:clear="onClearField"
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
class TextField extends CommonField {
  get appendIconComputed() {
    if (this.$attrs.appendIcon) return this.$attrs.appendIcon;
    if (!this.hasVisibility) return null;

    return this.isVisible ? "mdi-eye" : "mdi-eye-off";
  }

  // Only password-type fields can have a visibility toggle
  get hasVisibility() {
    return this.$attrs.type === "password";
  }

  get type() {
    if (!this.hasVisibility) return this.$attrs.type;

    return this.isVisible ? "text" : "password";
  }

  // Whether password is visible
  isVisible = true;

  created() {
    if (this.hasVisibility) {
      this.isVisible = false;
    }
  }

  /**
   * Focus on the field
   */
  focus() {
    return this.$refs.textField.$refs.input.focus();
  }

  /**
   * Clear the field
   */
  onClearField() {
    // NOTE: Must wait until next tick as Vuetify overwrites with null otherwise...
    setTimeout(() => {
      this.innerValue = "";
    }, 0);
  }

  /**
   * Toggle the field visibility
   */
  onVisibilityClick() {
    if (!this.hasVisibility) return;

    this.isVisible = !this.isVisible;
  }
}

export default TextField;
</script>
