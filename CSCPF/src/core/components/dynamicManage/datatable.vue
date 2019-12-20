<template>
  <div>
    <v-data-table
      :calculate-widths="propsClass.datatableProps.calculateWidths"
      :caption="propsClass.datatableProps.caption"
      :custom-filter="propsClass.datatableProps.customFilter"
      :custom-sort="propsClass.datatableProps.customSort"
      :dark="propsClass.datatableProps.dark"
      :dense="propsClass.datatableProps.dense"
      :disable-filtering="propsClass.datatableProps.disableFiltering"
      :disable-pagination="propsClass.datatableProps.disablePagination"
      :disable-sort="propsClass.datatableProps.disableSort"
      :expand-icon="propsClass.datatableProps.expandIcon"
      :expanded="propsClass.datatableProps.expanded"
      :fixed-header="propsClass.datatableProps.fixedHeader"
      :footer-props="propsClass.datatableProps.footerProps"
      :group-by="propsClass.datatableProps.groupBy"
      :group-desc="propsClass.datatableProps.groupDesc"
      :header-props="propsClass.datatableProps.headerProps"
      :headers="propsClass.datatableProps.headers"
      :headers-length="propsClass.datatableProps.headersLength"
      :height="propsClass.datatableProps.height"
      :hide-default-footer="propsClass.datatableProps.hideDefaultFooter"
      :hide-default-header="propsClass.datatableProps.hideDefaultHeader"
      :item-key="propsClass.datatableProps.itemKey"
      :items="items"
      :items-per-page="propsClass.datatableProps.itemsPerPage"
      :light="propsClass.datatableProps.light"
      :loading="propsClass.datatableProps.loading"
      :loading-text="propsClass.datatableProps.loadingText"
      :locale="propsClass.datatableProps.locale"
      :mobile-breakpoint="propsClass.datatableProps.mobileBreakpoint"
      :multi-sort="propsClass.datatableProps.multiSort"
      :must-sort="propsClass.datatableProps.mustSort"
      :no-data-text="propsClass.datatableProps.noDataText"
      :no-results-text="propsClass.datatableProps.noResultsText"
      :options="propsClass.datatableProps.options"
      :page="propsClass.datatableProps.page"
      :search="propsClass.datatableProps.search"
      :server-items-length="propsClass.datatableProps.serverItemsLength"
      :show-expand="propsClass.datatableProps.showExpand"
      :show-group-by="propsClass.datatableProps.showGroupBy"
      :show-select="propsClass.datatableProps.showSelect"
      :single-expand="propsClass.datatableProps.singleExpand"
      :single-select="propsClass.datatableProps.singleSelect"
      :sort-by="propsClass.datatableProps.sortBy"
      :sort-desc="propsClass.datatableProps.sortDesc"
    >
      <template v-slot:top>
        <v-card flat>
          <v-card-title>
            <div class="flex-grow-1"></div>
            <v-text-field
              v-model="propsClass.datatableProps.search"
              :append-icon="propsClass.searchIcon"
              :label="propsClass.searchPlaceholder"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
        </v-card>
      </template>
      <template v-slot:item="props">
        <slot name="dataRow" v-bind="props"></slot>
      </template>
      <template v-slot:expanded-item="props">
        <tr
          v-if="!props.isExpanded"
          class="v-data-table__expanded v-data-table__expanded__content"
        >
          <td :colspan="props.headers.length">
            <slot name="detailContentDT" v-bind="props.item"></slot>
          </td>
        </tr>
        <tr v-else></tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import Tools from "@/core/plugins/tools";
import { mapGetters } from "vuex";

export default {
  props: {
    propsClass: {
      type: Object,
      required: true
    }
  },

  data: () => ({}),

  computed: {
    ...mapGetters(["g_storages_project_serviceItem_items"]),
    items() {
      if (Tools.isNullOrEmpty(this.propsClass.itemsGetter)) {
        return this.propsClass.itemsHandler();
      } else {
        return this.$store.getters[this.propsClass.itemsGetter];
      }
    }
  }
};
</script>

<style></style>
