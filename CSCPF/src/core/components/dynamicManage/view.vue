<template>
  <v-card>
    <v-card-title
      :class="[
        GlobalEnv.layout.titleStateBgColor,
        ...propsClass.cardTitleClasses
      ]"
    >
      {{ propsClass.cardTitle }}
      <v-spacer></v-spacer>
      <v-btn
        v-if="
          propsClass.addPropAllow ||
            propsClass.addPropRole === '' ||
            (propsClass.addPropRole.length > 0 &&
              Tools.checkRole(propsClass.addPropRole))
        "
        :class="propsClass.addPropBtnClass"
        :color="propsClass.addPropBtnColor"
        :elevation="propsClass.addPropBtnElevation"
        @click="add"
        >{{ propsClass.addPropBtnText }}</v-btn
      >
    </v-card-title>
    <v-layout ustify-space-between pa-4>
      <v-flex>
        <DataTableComponent
          :props-class="propsClass.datatablePropsClass"
          @update="update"
        >
          <template v-slot:detailContentDT="item">
            <slot name="detailContent" v-bind="item"></slot>
          </template>
          <template v-slot:dataRow="props">
            <slot name="dataRow" v-bind="props">
              <tr>
                <td
                  v-for="header in props.headers"
                  :key="header.value"
                  :class="'text-' + header.align"
                >
                  <template v-if="header.value !== 'actions'">
                    {{ props.item[header.value] }}
                  </template>
                  <template v-else>
                    <v-tooltip
                      v-if="
                        propsClass.updatePropAllow &&
                          (propsClass.updatePropRole === '' ||
                            (propsClass.updatePropRole.length > 0 &&
                              Tools.checkRole(propsClass.updatePropRole)))
                      "
                      bottom
                    >
                      <template v-slot:activator="{ on }">
                        <v-icon
                          small
                          class="mr-2"
                          v-on="on"
                          @click="update(props.item)"
                          >{{ propsClass.updatePropIcon }}</v-icon
                        >
                      </template>
                      <span>{{ propsClass.updatePropText }}</span>
                    </v-tooltip>
                    <v-tooltip
                      v-if="
                        propsClass.removePropAllow &&
                          (propsClass.removePropRole === '' ||
                            (propsClass.removePropRole.length > 0 &&
                              Tools.checkRole(propsClass.removePropRole)))
                      "
                      bottom
                    >
                      <template v-slot:activator="{ on }">
                        <v-icon
                          small
                          class="mr-2"
                          v-on="on"
                          @click="remove(props.item)"
                          >{{ propsClass.removePropIcon }}</v-icon
                        >
                      </template>
                      <span>{{ propsClass.removePropText }}</span>
                    </v-tooltip>
                  </template>
                </td>
              </tr>
            </slot>
          </template>
        </DataTableComponent>
      </v-flex>
    </v-layout>
    <v-dialog
      v-model="addFormView"
      :max-width="propsClass.addPropFormViewerWidth"
      persistent
      scrollable
    >
      <AddFormComponent
        ref="addFormComp"
        :props-class="propsClass.addPropsClass"
        @close="closeAddFormView"
      ></AddFormComponent>
    </v-dialog>
    <v-dialog
      v-model="updateFormView"
      :max-width="propsClass.updatePropFormViewerWidth"
      persistent
      scrollable
    >
      <UpdateFormComponent
        ref="updateFormComp"
        :props-class="propsClass.updatePropsClass"
        @close="closeUpdateFormView"
      ></UpdateFormComponent>
    </v-dialog>
  </v-card>
</template>

<script>
import Tools from "@/core/plugins/tools";
import GlobalEnv from "@/core/constants/global-env";

import { setTimeout } from "timers";

import DataTableComponent from "@/core/components/dynamicManage/datatable";
import AddFormComponent from "@/core/components/dynamicManage/add";
import UpdateFormComponent from "@/core/components/dynamicManage/update";

export default {
  components: {
    DataTableComponent,
    AddFormComponent,
    UpdateFormComponent
  },
  props: {
    propsClass: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    Tools,
    GlobalEnv,
    addFormView: false,
    updateFormView: false
  }),
  methods: {
    closeAddFormView() {
      this.addFormView = false;
    },
    closeUpdateFormView() {
      this.updateFormView = false;
    },
    add() {
      if (!Tools.isNullOrEmpty(this.propsClass.customAddHandler)) {
        this.propsClass.customAddHandler();
      } else {
        this.addFormView = true;
      }

      setTimeout(() => {
        this.$refs.addFormComp.init();
      }, 200);
    },
    update(data) {
      if (!Tools.isNullOrEmpty(this.propsClass.customUpdateHandler)) {
        this.propsClass.customUpdateHandler(data);
      } else {
        this.updateFormView = true;
        setTimeout(() => this.$refs.updateFormComp.init(data));
      }
    },
    remove(data) {
      if (!Tools.isNullOrEmpty(this.propsClass.customRemoveHandler)) {
        this.propsClass.customRemoveHandler(data);
        return;
      }

      Tools.showConfirmMsg(
        this.propsClass.removePropConfirmTitle,
        this.propsClass.removePropConfirmMsg,
        this.propsClass.removePropConfirmInfo
      ).then(val => {
        if (!val) return;

        this.$store.commit(
          "m_layout_loading_msg",
          this.propsClass.removePropLoadingMsg
        );
        this.$store
          .dispatch(this.propsClass.removePropActionName, {
            id: data.id,
            status: false
          })
          .then(() => {
            Tools.showSuccessMsg(
              this.propsClass.removePropSuccessTitle,
              this.propsClass.removePropSuccessMsg
            );
            this.$store.commit("m_layout_loading_view", false);
          })
          .catch(err => {
            Tools.showErrorWithApi(
              err,
              this.propsClass.removePropErrorTitle,
              "project.apiErrors." +
                this.propsClass.removePropApiErrorState +
                "."
            );
            this.$store.commit("m_layout_loading_view", false);
          });
      });
    }
  }
};
</script>

<style></style>
