<template>
  <v-switch
    v-if="property.viewStatus === true"
    :id="property.inputClass.id"
    :ref="'input_' + property.name"
    v-model="value"
    :append-icon="property.inputClass.appendIcon"
    :background-color="property.inputClass.backgroundColor"
    :color="property.inputClass.color"
    :dark="property.inputClass.dark"
    :dense="property.inputClass.dense"
    :disabled="property.inputClass.disabled"
    :error="property.inputClass.error"
    :error-count="property.inputClass.errorCount"
    :error-messages="property.inputClass.errorMessages"
    :false-value="property.inputClass.falseValue"
    :flat="property.inputClass.flat"
    :hide-details="property.inputClass.hideDetails"
    :hint="property.inputClass.hint"
    :input-value="property.inputClass.inputValue"
    :inset="property.inputClass.inset"
    :label="property.label"
    :light="property.inputClass.light"
    :loading="property.inputClass.loading"
    :messages="property.inputClass.messages"
    :multiple="property.inputClass.multiple"
    :persistent-hint="property.inputClass.persistentHint"
    :prepend-icon="property.inputClass.prependIcon"
    :readonly="property.inputClass.readonly"
    :ripple="property.inputClass.ripple"
    :rules="property.getValidation(cursType)"
    :success="property.inputClass.success"
    :success-messages="property.inputClass.successMessages"
    :true-value="property.inputClass.trueValue"
    :validate-on-blur="property.inputClass.validateOnBlur"
    :value-comparator="property.inputClass.valueComparator"
  ></v-switch>
</template>

<script>
import Tools from "@/core/plugins/tools";

export default {
  props: {
    property: {
      type: Object,
      required: true
    },
    cursType: {
      type: String,
      required: false,
      default: "add"
    }
  },
  data: () => ({
    Tools
  }),
  computed: {
    value: {
      get() {
        return this.property.getValue();
      },
      set(val) {
        this.property.setValue(val);
      }
    }
  }
};
</script>

<style></style>
