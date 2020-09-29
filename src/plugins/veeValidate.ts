import { extend, setInteractionMode } from "vee-validate";
import {
  confirmed,
  email,
  max,
  min,
  numeric,
  required,
} from "vee-validate/dist/rules";

/**
 * Validation rules for vee-validate
 */
const VeeValidatePlugin = {
  /**
   * Plugin installation function
   * @param {Object} Vue     - Vue object
   * @param {Object} options - Plugin options
   */
  install: () => {
    // Only validate on blur OR every change if invalid
    setInteractionMode("eager");

    // Positive check
    extend("positive", (value) => value >= 0);

    // VeeValidate validation rules
    extend("confirmed", {
      ...confirmed,
      message: "{_field_} must match {target}",
    });
    extend("max", {
      ...max,
      params: ["length"],
      message: "{_field_} cannot be more than {length}",
    });
    extend("min", {
      ...min,
      params: ["length"],
      message: "{_field_} must be at least {length}",
    });
    extend("numeric", {
      ...numeric,
      message: "{_field_} must be only numbers",
    });
    extend("required", {
      ...required,
      message: "{_field_} is required",
    });
  },
};

export default VeeValidatePlugin;
