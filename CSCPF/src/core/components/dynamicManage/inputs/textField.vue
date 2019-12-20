<template>
  <v-text-field
    v-if="property.viewStatus === true"
    :id="property.inputClass.id"
    v-model="value"
    :append-icon="property.inputClass.appendIcon"
    :append-outer-icon="property.inputClass.appendOuterIcon"
    :autofocus="property.inputClass.autofocus"
    :background-color="property.inputClass.backgroundColor"
    :clear-icon="property.inputClass.clearIcon"
    :clearable="property.inputClass.clearable"
    :color="property.inputClass.color"
    :counter="property.inputClass.counter"
    :dark="property.inputClass.dark"
    :dense="property.inputClass.dense"
    :disabled="property.inputClass.disabled"
    :error="property.inputClass.error"
    :error-count="property.inputClass.errorCount"
    :error-messages="property.inputClass.errorMessages"
    :filled="property.inputClass.filled"
    :flat="property.inputClass.flat"
    :full-width="property.inputClass.fullWidth"
    :height="property.inputClass.height"
    :hide-details="property.inputClass.hideDetails"
    :hint="property.inputClass.hint"
    :light="property.inputClass.light"
    :label="property.label"
    :loader-height="property.inputClass.loaderHeight"
    :loading="property.inputClass.loading"
    :messages="property.inputClass.messages"
    :outlined="property.inputClass.outlined"
    :persistent-hint="property.inputClass.persistentHint"
    :placeholder="property.inputClass.placeholder"
    :prefix="property.inputClass.prefix"
    :prepend-icon="property.inputClass.prependIcon"
    :prepend-inner-icon="property.inputClass.prependInnerIcon"
    :readonly="property.inputClass.readonly"
    :reverse="property.inputClass.reverse"
    :rounded="property.inputClass.rounded"
    :rules="property.getValidation(cursType)"
    :shaped="property.inputClass.shaped"
    :single-line="property.inputClass.singleLine"
    :solo="property.inputClass.solo"
    :solo-inverted="property.inputClass.soloInverted"
    :success="property.inputClass.success"
    :success-messages="property.inputClass.successMessages"
    :suffix="property.inputClass.suffix"
    :type="property.inputClass.type"
    :validate-on-blur="property.inputClass.validateOnBlur"
  ></v-text-field>
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
