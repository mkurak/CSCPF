<template>
  <v-select
    v-if="property.viewStatus === true"
    :id="property.inputClass.id"
    v-model="value"
    :append-icon="property.inputClass.appendIcon"
    :append-outer-icon="property.inputClass.appendOuterIcon"
    :attach="property.inputClass.attach"
    :autofocus="property.inputClass.autofocus"
    :background-color="property.inputClass.backgroundColor"
    :cache-items="property.inputClass.cacheItems"
    :chips="property.inputClass.chips"
    :clear-icon="property.inputClass.clearIcon"
    :clearable="property.inputClass.clearable"
    :color="property.inputClass.color"
    :counter="property.inputClass.counter"
    :dark="property.inputClass.dark"
    :deletable-chips="property.inputClass.deletableChips"
    :dense="property.inputClass.dense"
    :disabled="property.inputClass.disabled"
    :eager="property.inputClass.eager"
    :error="property.inputClass.error"
    :error-count="property.inputClass.errorCount"
    :error-messages="property.inputClass.errorMessages"
    :filled="property.inputClass.filled"
    :filter="property.inputClass.filter"
    :flat="property.inputClass.flat"
    :full-width="property.inputClass.fullWidth"
    :height="property.inputClass.height"
    :hide-details="property.inputClass.hideDetails"
    :hide-selected="property.inputClass.hideSelected"
    :hint="property.inputClass.hint"
    :item-color="property.inputClass.itemColor"
    :item-disabled="property.inputClass.itemDisabled"
    :item-text="property.inputClass.itemText"
    :item-value="property.inputClass.itemValue"
    :items="items"
    :label="property.label"
    :light="property.inputClass.light"
    :loader-height="property.inputClass.loaderHeight"
    :loading="property.inputClass.loading"
    :menu-props="property.inputClass.menuProps"
    :messages="property.inputClass.messages"
    :multiple="property.inputClass.multiple"
    :no-data-text="property.inputClass.noDataText"
    :open-on-clear="property.inputClass.openOnClear"
    :outlined="property.inputClass.outlined"
    :persistent-hint="property.inputClass.persistentHint"
    :placeholder="property.inputClass.placeholder"
    :prefix="property.inputClass.prefix"
    :prepend-icon="property.inputClass.prependIcon"
    :prepend-inner-icon="property.inputClass.prependInnerIcon"
    :readonly="property.inputClass.readonly"
    :return-object="property.inputClass.returnObject"
    :reverse="property.inputClass.reverse"
    :rounded="property.inputClass.rounded"
    :rules="property.getValidation(cursType)"
    :shaped="property.inputClass.shaped"
    :single-line="property.inputClass.singleLine"
    :small-chips="property.inputClass.smallChips"
    :solo="property.inputClass.solo"
    :solo-inverted="property.inputClass.soloInverted"
    :success="property.inputClass.success"
    :success-messages="property.inputClass.successMessages"
    :suffix="property.inputClass.suffix"
    :type="property.inputClass.type"
    :validate-on-blur="property.inputClass.validateOnBlur"
    :value-comparator="property.inputClass.valueComparator"
  ></v-select>
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
    Tools,
    items: []
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
  },
  watch: {
    "property.inputClass.items"(n) {
      this.items = n;
    }
  },
  created() {
    this.items = this.property.inputClass.items;
  }
};
</script>

<style></style>
