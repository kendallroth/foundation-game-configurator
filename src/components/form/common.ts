/**
 * Common VeeValidate Vuetify override items
 */

const commonData = {
  innerValue: "",
};

const commonLifecycle = {
  created(that: any) {
    if (!that) {
      // eslint-disable-next-line no-console
      console.error("commonLifecycle.created called with no 'this' context!");
    }

    if (that.value) {
      that.innerValue = that.value;
    }
  },
};

const commonProps = {
  /**
   * Validation rules
   */
  rules: {
    type: [Object, String],
    default: "",
  },
  /**
   * Value (must be included in props)
   */
  value: {
    type: null,
  },
  /**
   * Validation ID (defaults to "name" attribute)
   *   Use if textfield name is not proper
   */
  vid: {
    type: String,
    default: null,
  },
  /**
   * Validation message field name (defaults to "label" attribute)
   *   Use if textfield label is not proper
   */
  vname: {
    type: String,
    default: null,
  },
};

const commonWatch = {
  // Handles internal model changes
  innerValue(newVal: any) {
    // @ts-ignore
    this.$emit("input", newVal);
  },
  // Handles external model changes
  value(newVal: any) {
    this.innerValue = newVal;
  },
};

export { commonData, commonLifecycle, commonProps, commonWatch };
