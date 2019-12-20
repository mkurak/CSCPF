<template>
  <v-card v-show="!sendProcessStatus" :loading="formLoading">
    <v-card-title class="headline">{{ propsClass.title }}</v-card-title>
    <v-divider></v-divider>
    <v-card-text class="pt-5">
      <v-form
        ref="actionForm"
        v-model="formValid"
        lazy-validation
        @submit.prevent="save"
      >
        <v-row>
          <v-col
            v-for="property in getProperties"
            :key="property.name"
            :cols="property.colSize"
          >
            <component
              :is="property.inputType"
              :ref="property.name"
              :property="property"
              :curs-type="'update'"
            ></component>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        outlined
        depressed
        color="warning"
        :loading="sendProcessStatus"
        :disable="formLoading"
        @click="close"
        >{{ propsClass.CancelBtnLabel }}</v-btn
      >
      <v-btn
        v-if="sendBtnViewStatus"
        depressed
        color="success"
        :loading="sendProcessStatus"
        :disable="formLoading"
        @click="save"
        >{{ propsClass.SaveBtnLabel }}</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import Tools from "@/core/plugins/tools";
import _ from "underscore";
import sha1 from "sha1";
import TextFieldInputComponent from "@/core/components/dynamicManage/inputs/textField";
import FileFieldInputComponent from "@/core/components/dynamicManage/inputs/fileField";
import SwitchInputComponent from "@/core/components/dynamicManage/inputs/switch";
import WysiwygInputComponent from "@/core/components/dynamicManage/inputs/wysiwyg";
import DatePickerInputComponent from "@/core/components/dynamicManage/inputs/datePicker";
import SelectInputComponent from "@/core/components/dynamicManage/inputs/select";

export default {
  components: {
    TextFieldInputComponent,
    FileFieldInputComponent,
    SwitchInputComponent,
    WysiwygInputComponent,
    DatePickerInputComponent,
    SelectInputComponent
  },
  props: {
    propsClass: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    sendProcessStatus: false,
    formLoading: false,
    formValid: true,
    currentData: null,
    sendBtnViewStatus: true
  }),
  computed: {
    getProperties() {
      let filteredProperties = this.propsClass.properties.filter(
        property => property.allowShowAdd
      );
      return filteredProperties;
    }
  },
  watch: {
    "propsClass.properties": {
      handler(n) {
        n.forEach(property => {
          property.execPropertiesChangeEvent(n, this.changeSendBtnViewStatus);
        });
      },
      deep: true
    }
  },
  methods: {
    init(data) {
      this.resetForm();

      this.$forceNextTick(() => {
        this.currentData = data;
      });

      this.$forceNextTick(() => {
        this.getProperties.forEach(property => {
          property.setValue(
            this.currentData[Tools.lowerFirstLetter(property.name)]
          );

          if (property.inputType === "WysiwygInputComponent") {
            if (this.$refs[property.name][0].$refs["input_" + property.name])
              this.$refs[property.name][0].$refs["input_" + property.name].set(
                property.value
              );
          }
        });
      });

      this.$forceNextTick(() => {
        this.getProperties.forEach(property => {
          property.execPropertiesChangeEvent(
            this.getProperties,
            this.changeSendBtnViewStatus
          );
        });
      });

      this.$forceNextTick(() => {
        this.formLoading = false;
      });
    },
    resetForm() {
      this.$forceNextTick(() => {
        if (this.getProperties.length > 0) {
          this.getProperties.forEach(property => {
            property.resetValue();

            switch (property.inputType) {
              case "FileFieldInputComponent":
                if (
                  this.$refs[property.name][0].$refs["input_" + property.name]
                )
                  this.$refs[property.name][0].$refs[
                    "input_" + property.name
                  ].clearableCallback();
                break;
              case "WysiwygInputComponent":
                if (
                  this.$refs[property.name][0].$refs["input_" + property.name]
                )
                  this.$refs[property.name][0].$refs[
                    "input_" + property.name
                  ].set("");
                break;
              case "DatePickerInputComponent":
                property.value = new Date();
                // if (
                //   this.$refs[property.name][0].$refs["input_" + property.name]
                // )
                //   this.$refs[property.name][0].$refs[
                //     "input_" + property.name
                //   ].set("");
                break;
            }
          });
        }
      });

      this.$forceNextTick(() => {
        this.formValid = true;
      });

      this.$forceNextTick(() => {
        this.$refs.actionForm.resetValidation();
      });
    },
    close() {
      this.formLoading = true;

      this.resetForm();

      this.$forceNextTick(() => {
        this.formLoading = false;
        this.$emit("close");
      });
    },
    save() {
      if (!this.$refs.actionForm.validate()) {
        this.$store.dispatch("a_snackbarMessage_add", {
          color: "error",
          message: "Formda hatalar var!"
        });
        return;
      }

      this.formLoading = true;

      let validationStatusForProperties = true;

      if (this.getProperties.length > 0) {
        this.getProperties.forEach(property => {
          if (!validationStatusForProperties) return;

          if (!Tools.isNullOrEmpty(property.saveValidationHandler))
            validationStatusForProperties = property.saveValidationHandler(
              this.getProperties,
              property
            );
        });
      }

      if (!validationStatusForProperties) return;

      this.sendProcessStatus = true;

      this.$store.commit("m_layout_loading_msg", this.propsClass.loadingMsg);

      let fileSupport = _.some(this.getProperties, property => {
        return property.inputType === "FileFieldInputComponent";
      });

      let sendData = null;
      let sortedProperties = _.sortBy(
        this.getProperties,
        "sendDataOrderNumber"
      );

      if (fileSupport) {
        sendData = new FormData();
        let hashString = "";
        sendData.append("id", this.currentData.id);
        hashString += this.currentData.id.toString();
        sortedProperties.forEach(property => {
          if (
            property.inputType === "FileFieldInputComponent" &&
            typeof property.getValue() !== "object"
          )
            return;

          sendData.append(property.name, property.getValue());

          if (property.inputType !== "FileFieldInputComponent")
            hashString += property.value;
        });

        let hashCode = sha1(hashString + this.propsClass.hashCode);

        sendData.append("Hash", hashCode);
      } else {
        sendData = {};
        sendData.id = this.currentData.id;
        sortedProperties.forEach(property => {
          sendData[property.name] = property.getValue();
        });
      }

      this.$store
        .dispatch(this.propsClass.actionName, sendData)
        .then(() => {
          this.$store.commit("m_layout_loading_view", false);
          this.sendProcessStatus = false;
          Tools.showSuccessMsg(
            this.propsClass.successTitle,
            this.propsClass.successMsg
          );
          this.close();
        })
        .catch(err => {
          Tools.showErrorWithApi(
            err,
            this.propsClass.errorTitle,
            "project.apiErrors." + this.propsClass.errorApiMsgs + "."
          );
          this.$store.commit("m_layout_loading_view", false);
          this.formLoading = false;
          this.sendProcessStatus = false;
        });
    },
    changeSendBtnViewStatus(status) {
      this.sendBtnViewStatus = status;
    }
  }
};
</script>

<style></style>
