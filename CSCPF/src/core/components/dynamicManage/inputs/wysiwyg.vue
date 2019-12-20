<template>
  <RichEditorComponent
    v-if="property.viewStatus === true"
    :ref="'input_' + property.name"
    :current-html="property.value"
    :title="property.label"
    :allow-bold="property.inputClass.allowBold"
    :allow-italic="property.inputClass.allowItalic"
    :allow-strike="property.inputClass.allowStrike"
    :allow-underline="property.inputClass.allowUnderline"
    :allow-code="property.inputClass.allowCode"
    :allow-paragraph="property.inputClass.allowParagraph"
    :allow-heading1="property.inputClass.allowHeading1"
    :allow-heading2="property.inputClass.allowHeading2"
    :allow-heading3="property.inputClass.allowHeading3"
    :allow-bullet-list="property.inputClass.allowBulletList"
    :allow-ordered-list="property.inputClass.allowOrderedList"
    :allow-blockquote="property.inputClass.allowBlockquote"
    :allow-code-block="property.inputClass.allowCodeBlock"
    :allow-horizontal-rule="property.inputClass.allowHorizontalRule"
    :allow-undo="property.inputClass.allowUndo"
    :allow-redo="property.inputClass.allowRedo"
    :allow-table="property.inputClass.allowTable"
    :allow-text-color="property.inputClass.allowTextColor"
    @updateHTML="updateHTML"
  ></RichEditorComponent>
</template>

<script>
import Tools from "@/core/plugins/tools";
import RichEditorComponent from "@/core/components/wysiwyg";

export default {
  components: {
    RichEditorComponent
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
  data: () => ({
    Tools
  }),
  methods: {
    updateHTML(value) {
      this.property.value = value;
    }
  }
};
</script>

<style></style>
