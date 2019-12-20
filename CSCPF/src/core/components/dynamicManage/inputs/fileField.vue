<template>
  <div>
    <v-file-input
      v-if="property.viewStatus === true"
      :id="property.inputClass.id"
      :ref="'input_' + property.name"
      v-model="file.fileInput"
      :append-icon="property.inputClass.appendIcon"
      :append-outer-icon="property.inputClass.appendOuterIcon"
      :autofocus="property.inputClass.autofocus"
      :background-color="property.inputClass.backgroundColor"
      :chips="property.inputClass.chips"
      :clear-icon="property.inputClass.clearIcon"
      :clearable="property.inputClass.clearable"
      :color="property.inputClass.color"
      :counter="property.inputClass.counter"
      :counter-size-string="property.inputClass.counterSizeString"
      :counter-string="property.inputClass.counterString"
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
      :label="property.label"
      :light="property.inputClass.light"
      :loader-height="property.inputClass.loaderHeight"
      :loading="property.inputClass.loading"
      :messages="property.inputClass.messages"
      :multiple="property.inputClass.multiple"
      :outlined="property.inputClass.outlined"
      :persistent-hint="property.inputClass.persistentHint"
      :placeholder="property.inputClass.placeholder"
      :prefix="property.inputClass.prefix"
      :prepend-icon="property.inputClass.prependIcon"
      :prepend-inner-icon="property.inputClass.prependInnerIcon"
      :reverse="property.inputClass.reverse"
      :rounded="property.inputClass.rounded"
      :rules="property.getValidation(cursType)"
      :shaped="property.inputClass.shaped"
      :show-size="property.inputClass.showSize"
      :single-line="property.inputClass.singleLine"
      :small-chips="property.inputClass.smallChips"
      :solo="property.inputClass.solo"
      :solo-inverted="property.inputClass.soloInverted"
      :success="property.inputClass.success"
      :success-messages="property.inputClass.successMessages"
      :suffix="property.inputClass.suffix"
      :truncate-length="property.inputClass.truncateLength"
      :type="property.inputClass.type"
      :validate-on-blur="property.inputClass.validateOnBlur"
      :accept="property.inputClass.acceptValue"
      @change="fileChange"
    ></v-file-input>
    <v-img
      v-if="
        property.inputClass.fileType === 'image' &&
          !Tools.isNullOrEmpty(property.value) &&
          typeof property.value !== 'object'
      "
      :src="
        Tools.getImage(property.inputClass.imageRootPath, property.value, '')
      "
      :lazy-src="
        Tools.getImage(property.inputClass.imageRootPath, property.value, '')
      "
      :class="property.inputClass.imageViewerClass"
    >
      <template v-slot:placeholder>
        <v-layout fill-height align-center justify-center ma-0>
          <v-progress-circular
            indeterminate
            :color="property.inputClass.imageViewerProgressClass"
          ></v-progress-circular>
        </v-layout>
      </template>
    </v-img>
    <span
      v-if="
        property.inputClass.fileType !== 'image' &&
          !Tools.isNullOrEmpty(property.value) &&
          typeof property.value !== 'object'
      "
    >
      <a
        :href="
          Tools.getImage(property.inputClass.imageRootPath, property.value, '')
        "
        target="_blank"
      >
        {{ property.value }}
      </a>
    </span>
  </div>
</template>

<script>
import Tools from "@/core/plugins/tools";
import GlobalEnv from "@/core/constants/global-env";

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
    GlobalEnv,
    file: {
      fileInput: null,
      fileName: null,
      fileUrl: "",
      file: null
    }
  }),
  methods: {
    fileChange(file) {
      if (!Tools.isNullOrEmpty(file) && file.length > 0) {
        if (!Tools.isNullOrEmpty(this.property.inputClass.allowFileTypes)) {
          if (typeof this.property.inputClass.allowFileTypes === "string") {
            if (file[0]["type"] !== this.property.inputClass.allowFileTypes) {
              Tools.showErrorMsg(
                "Geçersiz Dosya Formatı!",
                "Belirtilen dosyanın formatı geçerli değil!"
              );
              return;
            }
          } else {
            var checkType = this.property.inputClass.allowFileTypes.filter(
              type => type === file[0]["type"]
            );
            if (checkType.length === 0) {
              Tools.showErrorMsg(
                "Geçersiz Dosya Formatı!",
                "Belirtilen dosyanın formatı geçerli değil!"
              );
              return;
            }
          }
        }

        this.file.fileName = file[0].name;
        if (this.file.fileName.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(file[0]);
        fr.addEventListener("load", () => {
          this.file.fileUrl = fr.result;
          this.file.file = file[0];
          this.property.value = file[0];
        });
      } else {
        this.file.fileInput = null;
        this.file.fileName = null;
        this.file.fileUrl = "";
        this.file.file = null;
        this.property.value = null;
      }
    }
  }
};
</script>

<style></style>
