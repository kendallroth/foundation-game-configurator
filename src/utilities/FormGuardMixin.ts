import { Component, Vue } from "vue-property-decorator";
import { Route, NavigationGuardNext } from "vue-router/types";

@Component
export default class FormGuardMixin extends Vue {
  // TODO: Possibly configure via router 'props'?

  isFormGuardActive = true;

  formLeaveCallback: ((leave: boolean) => void) | null = null

  get formKeys(): string[] {
    return this.$data.formGuardKeys || null;
  }

  get isLeaveFormActive(): boolean {
    return Boolean(this.formLeaveCallback);
  }

  set isLeaveFormActive(val: boolean) {
    // Can only set to inactive, since setting to "active" requires a "next()" callback!
    if (!val) {
      // Must wait until next tick to avoid clearing callback before calling
      this.$nextTick(() => {
        this.formLeaveCallback = null;
      });
    }
  }

  // TODO: Possibly implement via router 'props'?
  get onlyPrevent(): boolean {
    return false;
  }

  onFormLeave(shouldLeave: boolean): void {
    if (!this.formLeaveCallback) return;

    this.formLeaveCallback(shouldLeave);
  }

  beforeRouteLeave(to: Route, from: Route, next: NavigationGuardNext) {
    console.log("beforeRouteLeave");

    // Check all supplied forms for unsaved changes
    if (typeof this.formKeys === "string") {
      const isClean = checkFormClean(this, this.formKeys);
      if (isClean) return next();
    } else if (Array.isArray(this.formKeys)) {
      const areAllClean = this.formKeys.every((key) =>
        checkFormClean(this, key)
      );
      if (areAllClean) return next();
    } else {
      /* istanbul ignore next - Uncommon case */
      return next();
    }

    // The "onlyPrevent" option only prevents leaving with unsaved data,
    //   and does not manage any additional "active" status.
    if (this.onlyPrevent) return;

    /**
     * Callback to determine whether leaving form is allowed
     * @param {boolean} shouldContinue - Whether to leave the form
     */
    const callback = (shouldContinue = false) => {
      // Prevent calling twice (from here and "onPrevent" handler)
      if (!this.formLeaveCallback) return;
      this.formLeaveCallback = null;

      if (shouldContinue) {
        // Reset the form before leaving (otherwise it sometimes retains data)
        if (Array.isArray(this.formKeys)) {
          this.formKeys.forEach((key) => resetForm(this, key));
        } else {
          resetForm(this, this.formKeys);
        }

        return next();
      }
    };

    // Set the callback and pass the reference to the "onPrevent" callback
    this.formLeaveCallback = callback;
  }
}

/**
 * Check whether a form has any unsaved changes
 * @param  {Object}  that    - Calling 'this' context
 * @param  {string}  formKey - Form state key
 * @return {boolean}         - Whether form is clean
 */
function checkFormClean(that: any, formKey: string) {
  const form = that[formKey];
  if (!form) return true;

  return !form.flags.changed && !form.flags.submitting;
}

/**
 * Reset a form
 * @param {Object} that    - Calling 'this' context
 * @param {string} formKey - Form state key
 */
function resetForm(that: any, formKey: string) {
  const form = that[formKey];
  if (!form) return;

  form.reset();
}

/* eslint @typescript-eslint/no-use-before-define: off */
