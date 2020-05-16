<template>
  <div>
    <v-snackbar
      v-for="(item, i) in items"
      :key="item.id"
      :value="i === 0"
      :timeout="timeout"
      :color="item.color"
      :top="top"
      :right="right"
      :absolute="absolute"
      :bottom="bottom"
      :left="left"
      :multi-line="multiLine"
      :vertical="vertical"
    >
      {{ Tools.checkI18n(item.message) }}
      <v-btn
        v-if="items.length > 1"
        icon
        color="white"
        @click="removeItem(item.id)"
      >
        {{
          $t("components.app.VSnackbarQueue.nextAlertView", {
            count: items.length - 1
          })
        }}
      </v-btn>
      <v-btn v-else icon color="white" text @click="removeItem(item.id)">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { first, isEmpty } from "underscore";
import Tools from "@/core/plugins/tools";

export default {
  name: "VSnackbarQueue",
  props: {
    /**
     * Array for items to display [{id: '', color: '', message: ''}]
     */
    items: {
      type: Array,
      required: true
    },
    value: {
      type: Boolean,
      required: false,
      default: false
    },
    timeout: {
      type: Number,
      required: false,
      default: 2000
    },
    color: {
      type: String,
      required: false,
      default: "error"
    },
    top: {
      type: Boolean,
      required: false,
      default: false
    },
    right: {
      type: Boolean,
      required: false,
      default: false
    },
    absolute: {
      type: Boolean,
      required: false,
      default: false
    },
    bottom: {
      type: Boolean,
      required: false,
      default: false
    },
    left: {
      type: Boolean,
      required: false,
      default: false
    },
    multiLine: {
      type: Boolean,
      required: false,
      default: false
    },
    vertical: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data: () => ({
    Tools,
    processing: false,
    timeoutId: false
  }),
  watch: {
    items() {
      this.processItems();
    }
  },
  methods: {
    processItems() {
      const vm = this;
      vm.processing = true;

      if (!isEmpty(vm.items)) {
        const item = first(vm.items);
        return (vm.timeoutId = setTimeout(() => {
          vm.removeItem(item.id);
        }, vm.timeout));
      }

      vm.processing = false;
    },
    removeItem(id) {
      const vm = this;
      clearTimeout(vm.timeoutId);
      this.$store.dispatch("a_snackbarMessage_remove", id).then(() => {
        if (vm.items.length > 0) {
          return vm.processItems();
        }
      });
    }
  }
};
</script>
