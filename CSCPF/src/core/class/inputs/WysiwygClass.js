class WysiwygClass {
  constructor(
    title,
    allowBold,
    allowItalic,
    allowStrike,
    allowUnderline,
    allowCode,
    allowParagraph,
    allowHeading1,
    allowHeading2,
    allowHeading3,
    allowBulletList,
    allowOrderedList,
    allowBlockquote,
    allowCodeBlock,
    allowHorizontalRule,
    allowUndo,
    allowRedo,
    allowTable,
    allowTextColor
  ) {
    this.title = title || "İçerik";
    this.allowBold = allowBold || true;
    this.allowItalic = allowItalic || true;
    this.allowStrike = allowStrike || true;
    this.allowUnderline = allowUnderline || true;
    this.allowCode = allowCode || true;
    this.allowParagraph = allowParagraph || true;
    this.allowHeading1 = allowHeading1 || true;
    this.allowHeading2 = allowHeading2 || true;
    this.allowHeading3 = allowHeading3 || true;
    this.allowBulletList = allowBulletList || true;
    this.allowOrderedList = allowOrderedList || true;
    this.allowBlockquote = allowBlockquote || true;
    this.allowCodeBlock = allowCodeBlock || true;
    this.allowHorizontalRule = allowHorizontalRule || true;
    this.allowUndo = allowUndo || true;
    this.allowRedo = allowRedo || true;
    this.allowTable = allowTable || true;
    this.allowTextColor = allowTextColor || true;
  }
}

export default WysiwygClass;
