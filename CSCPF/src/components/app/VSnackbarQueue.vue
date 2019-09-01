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
      <v-btn icon v-else color="white" text @click="removeItem(item.id)">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { first, isEmpty } from "underscore";
import Tools from "../../plugins/tools";

export default {
  name: "VSnackbarQueue",
  data: () => ({
    Tools,
    processing: false,
    timeoutId: false
  }),
  props: {
    /**
     * Array for items to display [{id: '', color: '', message: ''}]
     */
    items: {
      type: Array,
      required: true
    },
    value: {
      required: false,
      default: false
    },
    timeout: {
      required: false,
      default: 2000
    },
    color: {
      required: false,
      default: "error"
    },
    top: {
      required: false,
      default: false
    },
    right: {
      required: false,
      default: false
    },
    absolute: {
      required: false,
      default: false
    },
    bottom: {
      required: false,
      default: false
    },
    left: {
      required: false,
      default: false
    },
    multiLine: {
      required: false,
      default: false
    },
    vertical: {
      required: false,
      default: false
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
  },
  watch: {
    items() {
      this.processItems();
    }
  }
};
</script>
