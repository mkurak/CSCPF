<template>
  <div>
    <PickerComponent
      v-if="property.viewStatus === true"
      :id="property.inputClass.id"
      :label="property.label"
      :transition="property.inputClass.transition"
      :prepend-icon="property.inputClass.prependIcon"
      :current-date="formatDateString(property.value)"
      :rules="property.getValidation(cursType)"
      @changeDate="entryDateChange"
    ></PickerComponent>
  </div>
</template>

<script>
import moment from "moment";
import PickerComponent from "@/core/components/datePicker";

export default {
  components: {
    PickerComponent
  },
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
  methods: {
    entryDateChange(date) {
      this.property.value = date;
    },
    formatDateString(dateVal) {
      return moment(new Date(dateVal)).format("YYYY-MM-DD");
    }
  }
};
</script>

<style></style>
