<template>
  <div :id="divId">
    <span class="subtitle-2">{{ title }}</span>
    <draggable v-model="items" v-bind="{ animation: 150 }">
      <template v-for="item in items">
        <div :key="item.id">
          <v-text-field
            v-model="item.text"
            prepend-icon="mdi-text-short"
            append-outer-icon="mdi-delete"
            dense
            @click:append-outer="removeItem(item)"
          ></v-text-field>
        </div>
      </template>
    </draggable>

    <v-text-field
      ref="itemInsertInput"
      v-model="newItemText"
      :label="newItemLabel"
      prepend-icon="mdi-playlist-plus"
      append-icon="mdi-plus"
      dense
      @click:append="addItem"
      @keyup.enter="addItem"
    ></v-text-field>
  </div>
</template>

<script>
import _ from "underscore";
import Tools from "@/core/plugins/tools";
import draggable from "vuedraggable";

export default {
  components: {
    draggable
  },
  props: {
    value: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      required: true
    },
    newItemLabel: {
      type: String,
      required: true
    },
    splitChars: {
      type: String,
      required: false,
      default: "||"
    }
  },
  data: () => ({
    newItemText: "",
    items: [],
    divId: _.uniqueId("matterInput")
  }),
  watch: {
    items: {
      handler() {
        this.$emit("input", this.giveItemsToString());
      },
      deep: true
    }
  },
  methods: {
    addItem() {
      this.items.push({
        id: _.uniqueId("item"),
        text: this.newItemText
      });

      this.newItemText = "";

      this.$refs.itemInsertInput.focus();
    },
    removeItem(item) {
      this.items = _.without(
        this.items,
        _.findWhere(this.items, {
          id: item.id
        })
      );
    },
    giveItems() {
      return this.items;
    },
    giveItemsToString() {
      let rtn = "";

      if (this.items.length > 0) {
        this.items.forEach(item => {
          rtn += item.text + this.splitChars;
        });
      }

      return rtn;
    },
    takeItems(items) {
      this.items = items;
    },
    takeStringItems(stringItems) {
      this.items = [];

      let stringSplit = stringItems.split(this.splitChars);

      stringSplit.forEach(item => {
        if (!Tools.isNullOrEmpty(item))
          this.items.push({
            id: _.uniqueId("item"),
            text: item
          });
      });
    }
  }
};
</script>

<style></style>
