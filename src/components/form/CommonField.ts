/**
 * Common VeeValidate Vuetify override items
 */

import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component
class CommonField extends Vue {
  /**
   * Validation rules
   */
  @Prop({ default: "" })
  rules!: object | string;

  /**
   * Value (must be included in props)
   */
  @Prop({ required: true })
  value!: string | number | boolean;

  /**
   * Validation ID (defaults to "name" attribute)
   *   Use if component name is not proper
   */
  @Prop({ default: null })
  vid!: string | null;

  /**
   * Validation message field name (defaults to "label" attribute)
   *   Use if component label is not proper
   */
  @Prop({ default: null })
  vname!: string | null;

  // Inner value is used for v-model
  innerValue: any = "";

  // Handles internal model changes
  @Watch("innerValue")
  onInnerValueChanged(newVal: any) {
    this.$emit("input", newVal);
  }

  // Handles external model changes
  @Watch("value")
  onValueChanged(newVal: any) {
    this.innerValue = newVal;
  }

  created() {
    if (this.value) {
      this.innerValue = this.value;
    }
  }
}

export default CommonField;

/* eslint @typescript-eslint/no-explicit-any: off */
