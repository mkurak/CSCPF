import { Mark } from "tiptap";
import { toggleMark } from "tiptap-commands";

export default class TextColor extends Mark {
  get name() {
    return "textcolor";
  }

  get defaultOptions() {
    return {
      color: [
        "#F44336",
        "#E91E63",
        "#9C27B0",
        "#673AB7",
        "#3F51B5",
        "#B71C1C",
        "#880E4F",
        "#4A148C",
        "#311B92",
        "#1A237E",
        "#C62828",
        "#AD1457",
        "#6A1B9A",
        "#4527A0",
        "#283593",
        "#D32F2F",
        "#C2185B",
        "#7B1FA2",
        "#512DA8",
        "#303F9F",
        "#E53935",
        "#D81B60",
        "#8E24AA",
        "#5E35B1",
        "#3949AB",
        "#EF5350",
        "#EC407A",
        "#AB47BC",
        "#7E57C2",
        "#5C6BC0",
        "#E57373",
        "#F06292",
        "#BA68C8",
        "#9575CD",
        "#7986CB",
        "#EF9A9A",
        "#F48FB1",
        "#CE93D8",
        "#B39DDB",
        "#B39DDB",
        "#FFCDD2",
        "#F8BBD0",
        "#E1BEE7",
        "#D1C4E9",
        "#C5CAE9",
        "#FFEBEE",
        "#FCE4EC",
        "#F3E5F5",
        "#EDE7F6",
        "#E8EAF6",
        "#2196F3",
        "#03A9F4",
        "#00BCD4",
        "#009688",
        "#4CAF50",
        "#0D47A1",
        "#01579B",
        "#006064",
        "#004D40",
        "#1B5E20",
        "#1565C0",
        "#0277BD",
        "#00838F",
        "#00695C",
        "#2E7D32",
        "#1976D2",
        "#0288D1",
        "#0097A7",
        "#00796B",
        "#388E3C",
        "#1E88E5",
        "#039BE5",
        "#00ACC1",
        "#00897B",
        "#43A047",
        "#42A5F5",
        "#29B6F6",
        "#26C6DA",
        "#26A69A",
        "#66BB6A",
        "#64B5F6",
        "#4FC3F7",
        "#4DD0E1",
        "#4DB6AC",
        "#81C784",
        "#90CAF9",
        "#81D4FA",
        "#80DEEA",
        "#80CBC4",
        "#A5D6A7",
        "#BBDEFB",
        "#B3E5FC",
        "#B2EBF2",
        "#B2DFDB",
        "#C8E6C9",
        "#E3F2FD",
        "#E1F5FE",
        "#E0F7FA",
        "#E0F2F1",
        "#E8F5E9",
        "#8BC34A",
        "#CDDC39",
        "#FFEB3B",
        "#FFC107",
        "#FF9800",
        "#33691E",
        "#827717",
        "#F57F17",
        "#FF6F00",
        "#E65100",
        "#558B2F",
        "#9E9D24",
        "#F9A825",
        "#FF8F00",
        "#EF6C00",
        "#689F38",
        "#AFB42B",
        "#FBC02D",
        "#FFA000",
        "#F57C00",
        "#7CB342",
        "#C0CA33",
        "#FDD835",
        "#FFB300",
        "#FB8C00",
        "#9CCC65",
        "#D4E157",
        "#FFEE58",
        "#FFCA28",
        "#FFA726",
        "#AED581",
        "#DCE775",
        "#FFF176",
        "#FFD54F",
        "#FFB74D",
        "#C5E1A5",
        "#E6EE9C",
        "#FFF59D",
        "#FFE082",
        "#FFCC80",
        "#DCEDC8",
        "#F0F4C3",
        "#FFF9C4",
        "#FFECB3",
        "#FFE0B2",
        "#F1F8E9",
        "#F9FBE7",
        "#FFFDE7",
        "#FFF8E1",
        "#FFF3E0",
        "#FF5722",
        "#795548",
        "#607D8B",
        "#9E9E9E",
        "#000000",
        "#BF360C",
        "#3E2723",
        "#263238",
        "#212121",
        "#FFFFFF",
        "#D84315",
        "#4E342E",
        "#37474F",
        "#424242",
        "#E64A19",
        "#5D4037",
        "#455A64",
        "#616161",
        "#F4511E",
        "#6D4C41",
        "#546E7A",
        "#757575",
        "#FF7043",
        "#8D6E63",
        "#78909C",
        "#BDBDBD",
        "#FF8A65",
        "#A1887F",
        "#90A4AE",
        "#E0E0E0",
        "#FFAB91",
        "#BCAAA4",
        "#B0BEC5",
        "#EEEEEE",
        "#FFCCBC",
        "#D7CCC8",
        "#CFD8DC",
        "#F5F5F5",
        "#FBE9E7",
        "#EFEBE9",
        "#ECEFF1",
        "#FAFAFA"
      ]
    };
  }

  get schema() {
    return {
      attrs: {
        color: {
          default: "#000000"
        }
      },
      parseDOM: this.options.color.map(color => {
        return {
          tag: `span[style="color:${color}"]`,
          attrs: { color }
        };
      }),
      toDOM: node => {
        return [
          "span",
          {
            style: `color:${node.attrs.color}`
          },
          0
        ];
      }
    };
  }

  commands({ type }) {
    return attrs => toggleMark(type, attrs);
  }
}
