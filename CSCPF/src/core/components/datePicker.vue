<template>
  <v-menu
    ref="menu1"
    v-model="menu1"
    :close-on-content-click="false"
    :transition="transition"
    :rules="rules"
    offset-y
    max-width="290px"
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        :id="id"
        v-model="dateFormatted"
        :label="label"
        persistent-hint
        prepend-icon="mdi-calendar"
        @blur="date = parseDate(dateFormatted)"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="date"
      no-title
      @input="menu1 = false"
    ></v-date-picker>
  </v-menu>
</template>

<script>
import { setTimeout } from "timers";
import Tools from "@/core/plugins/tools";

export default {
  props: {
    currentDate: {
      type: String,
      required: false,
      default: ""
    },
    label: {
      type: String,
      required: false,
      default: "Date"
    },
    id: {
      type: String,
      required: false,
      default: ""
    },
    transition: {
      type: String,
      required: false,
      default: "scale-transition"
    },
    prependIcon: {
      type: String,
      required: false,
      default: "mdi-calendar"
    },
    rules: {
      type: Array,
      required: false,
      default: () => []
    }
  },

  data: () => ({
    date: "",
    dateFormatted: "",
    menu1: false
  }),

  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    }
  },

  watch: {
    date() {
      this.dateFormatted = this.formatDate(this.date);
      this.$emit("changeDate", this.date);
    },
    currentDate() {
      setTimeout(() => {
        if (!Tools.isNullOrEmpty(this.currentDate))
          this.date = this.currentDate;
      }, 200);
    }
  },

  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [day, month, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }
  }
};
</script>

<style></style>
