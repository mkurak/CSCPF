<template>
  <div>
    <p class="title mt-4">{{ title }}</p>
    <EditorMenuBar v-slot="{ commands, isActive }" :editor="editor">
      <div>
        <v-row>
          <v-col cols="12">
            <v-btn
              v-if="allowBold"
              depressed
              small
              class="mr-1 mb-2"
              @click="commands.bold"
            >
              <v-icon small>mdi-format-bold</v-icon>
            </v-btn>
            <v-btn
              v-if="allowItalic"
              depressed
              small
              class="mr-1 mb-2"
              @click="commands.italic"
            >
              <v-icon small>mdi-format-italic</v-icon>
            </v-btn>
            <v-btn
              v-if="allowStrike"
              depressed
              small
              class="mr-1 mb-2"
              @click="commands.strike"
            >
              <v-icon small>mdi-format-strikethrough-variant</v-icon>
            </v-btn>
            <v-btn
              v-if="allowUnderline"
              depressed
              small
              class="mr-1 mb-2"
              @click="commands.underline"
            >
              <v-icon small>mdi-format-underline</v-icon>
            </v-btn>
            <v-btn
              v-if="allowCode"
              depressed
              small
              class="mr-1 mb-2"
              @click="commands.code"
            >
              <v-icon small>mdi-code-tags</v-icon>
            </v-btn>
            <v-btn
              v-if="allowParagraph"
              depressed
              small
              class="mr-1 mb-2"
              @click="commands.paragraph"
            >
              <v-icon small>mdi-format-paragraph</v-icon>
            </v-btn>
            <v-btn
              v-if="allowHeading1"
              small
              depressed
              class="mr-1 mb-2"
              @click="commands.heading({ level: 1 })"
            >
              <v-icon small>mdi-format-header-1</v-icon>
            </v-btn>
            <v-btn
              v-if="allowHeading2"
              small
              depressed
              class="mr-1 mb-2"
              @click="commands.heading({ level: 2 })"
            >
              <v-icon small>mdi-format-header-2</v-icon>
            </v-btn>
            <v-btn
              v-if="allowHeading3"
              small
              depressed
              class="mr-1 mb-2"
              @click="commands.heading({ level: 3 })"
            >
              <v-icon small>mdi-format-header-3</v-icon>
            </v-btn>
            <v-btn
              v-if="allowBulletList"
              small
              depressed
              class="mr-1 mb-2"
              @click="commands.bullet_list"
            >
              <v-icon small>mdi-format-list-bulleted</v-icon>
            </v-btn>
            <v-btn
              v-if="allowOrderedList"
              small
              depressed
              class="mr-1 mb-2"
              @click="commands.ordered_list"
            >
              <v-icon small>mdi-format-list-numbered</v-icon>
            </v-btn>
            <v-btn
              v-if="allowBlockquote"
              small
              depressed
              class="mr-1 mb-2"
              @click="commands.blockquote"
            >
              <v-icon small>mdi-format-quote-close</v-icon>
            </v-btn>
            <v-btn
              v-if="allowCodeBlock"
              small
              depressed
              class="mr-1 mb-2"
              @click="commands.code_block"
            >
              <v-icon small>mdi-code-braces</v-icon>
            </v-btn>
            <v-btn
              v-if="allowHorizontalRule"
              small
              depressed
              class="mr-1 mb-2"
              @click="commands.horizontal_rule"
            >
              <v-icon small>mdi-minus</v-icon>
            </v-btn>
            <v-btn
              v-if="allowTable"
              small
              depressed
              class="mr-1 mb-2"
              @click="
                commands.createTable({
                  rowsCount: 3,
                  colsCount: 3,
                  withHeaderRow: false
                })
              "
            >
              <v-icon small>mdi-table-large</v-icon>
            </v-btn>
            <v-btn
              v-if="allowTable && isActive.table()"
              small
              depressed
              class="mr-1 mb-2"
              @click="commands.deleteTable"
            >
              <v-icon small>mdi-table-remove</v-icon>
            </v-btn>
            <v-btn
              v-if="allowTable && isActive.table()"
              small
              depressed
              class="mr-1 mb-2"
              @click="commands.addColumnBefore"
            >
              <v-icon small>mdi-table-column-plus-before</v-icon>
            </v-btn>
            <v-btn
              v-if="allowTable && isActive.table()"
              small
              depressed
              class="mr-1 mb-2"
              @click="commands.addColumnAfter"
            >
              <v-icon small>mdi-table-column-plus-after</v-icon>
            </v-btn>
            <v-btn
              v-if="allowTable && isActive.table()"
              small
              depressed
              class="mr-1 mb-2"
              @click="commands.deleteColumn"
            >
              <v-icon small>mdi-table-column-remove</v-icon>
            </v-btn>
            <v-btn
              v-if="allowTable && isActive.table()"
              small
              depressed
              class="mr-1 mb-2"
              @click="commands.addRowBefore"
            >
              <v-icon small>mdi-table-row-plus-before</v-icon>
            </v-btn>
            <v-btn
              v-if="allowTable && isActive.table()"
              small
              depressed
              class="mr-1 mb-2"
              @click="commands.addRowAfter"
            >
              <v-icon small>mdi-table-row-plus-after</v-icon>
            </v-btn>
            <v-btn
              v-if="allowTable && isActive.table()"
              small
              depressed
              class="mr-1 mb-2"
              @click="commands.deleteRow"
            >
              <v-icon small>mdi-table-row-remove</v-icon>
            </v-btn>
            <v-btn
              v-if="allowTable && isActive.table()"
              small
              depressed
              class="mr-1 mb-2"
              @click="commands.toggleCellMerge"
            >
              <v-icon small>mdi-table-merge-cells</v-icon>
            </v-btn>
            <v-btn
              v-if="allowTextColor"
              small
              depressed
              class="mr-1 mb-2"
              @click="showTextColorPicker = true"
            >
              <v-icon small>mdi-palette</v-icon>
            </v-btn>
            <v-btn
              v-if="allowUndo"
              small
              depressed
              class="mr-1 mb-2"
              @click="commands.undo"
            >
              <v-icon small>mdi-undo</v-icon>
            </v-btn>
            <v-btn
              v-if="allowRedo"
              small
              depressed
              class="mr-1 mb-2"
              @click="commands.redo"
            >
              <v-icon small>mdi-redo</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row v-if="showTextColorPicker">
          <v-col cols="12" class="d-flex justify-center">
            <v-color-picker
              v-model="textColor"
              hide-canvas
              hide-inputs
              hide-mode-switch
              show-swatches
            ></v-color-picker>
          </v-col>
          <v-col cols="12">
            <div class="d-flex justify-center">
              <v-btn @click="applyTextColor(commands)">UYGULA</v-btn>
            </div>
          </v-col>
        </v-row>
      </div>
    </EditorMenuBar>
    <EditorContent :editor="editor" class="editorContentState" />
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
  Table,
  TableHeader,
  TableCell,
  TableRow
} from "tiptap-extensions";
import TextColor from "@/core/plugins/tiptapColorExt";

export default {
  components: {
    EditorMenuBar,
    EditorContent
  },
  props: {
    currentHtml: {
      type: String,
      required: false,
      default: ""
    },
    title: {
      type: String,
      required: true
    },
    allowBold: {
      type: Boolean,
      required: false,
      default: true
    },
    allowItalic: {
      type: Boolean,
      required: false,
      default: true
    },
    allowStrike: {
      type: Boolean,
      required: false,
      default: true
    },
    allowUnderline: {
      type: Boolean,
      required: false,
      default: true
    },
    allowCode: {
      type: Boolean,
      required: false,
      default: true
    },
    allowParagraph: {
      type: Boolean,
      required: false,
      default: true
    },
    allowHeading1: {
      type: Boolean,
      required: false,
      default: true
    },
    allowHeading2: {
      type: Boolean,
      required: false,
      default: true
    },
    allowHeading3: {
      type: Boolean,
      required: false,
      default: true
    },
    allowBulletList: {
      type: Boolean,
      required: false,
      default: true
    },
    allowOrderedList: {
      type: Boolean,
      required: false,
      default: true
    },
    allowBlockquote: {
      type: Boolean,
      required: false,
      default: true
    },
    allowCodeBlock: {
      type: Boolean,
      required: false,
      default: true
    },
    allowHorizontalRule: {
      type: Boolean,
      required: false,
      default: true
    },
    allowUndo: {
      type: Boolean,
      required: false,
      default: true
    },
    allowRedo: {
      type: Boolean,
      required: false,
      default: true
    },
    allowTable: {
      type: Boolean,
      required: false,
      default: true
    },
    allowTextColor: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data: () => ({
    editor: null,
    showTextColorPicker: false,
    textColor: "#000000"
  }),
  mounted() {
    this.editor = new Editor({
      extensions: [
        new Blockquote(),
        new BulletList(),
        new CodeBlock(),
        new HardBreak(),
        new Heading({ levels: [1, 2, 3] }),
        new HorizontalRule(),
        new ListItem(),
        new OrderedList(),
        new TodoItem(),
        new TodoList(),
        new Link(),
        new Bold(),
        new Code(),
        new Italic(),
        new Strike(),
        new Underline(),
        new History(),
        new Table({
          resizable: true
        }),
        new TableHeader(),
        new TableCell(),
        new TableRow(),
        new TextColor()
      ],
      content: this.currentHtml,
      onUpdate: html => {
        this.$emit("updateHTML", html.getHTML());
      }
    });
  },
  beforeDestroy() {
    this.editor.destroy();
  },
  methods: {
    get() {
      return this.editor.getHTML();
    },
    clear() {
      this.editor.clearContent();
    },
    set(content) {
      this.editor.setContent(content);
    },
    applyTextColor(commands) {
      commands.textcolor({ color: `${this.textColor}` });
      this.showTextColorPicker = false;
    }
  }
};
</script>

<style>
.editorContentState {
  border: 1px dotted black !important;
  padding: 5px;
}

.editorContentState td {
  padding: 2px;
  border: 1px solid gray;
}

.v-color-picker__controls {
  display: none !important;
}
</style>
