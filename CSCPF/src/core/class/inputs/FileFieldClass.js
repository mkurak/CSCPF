class FileFieldClass {
  constructor(
    appendIcon,
    appendOuterIcon,
    autofocus,
    backgroundColor,
    chips,
    clearIcon,
    clearable,
    color,
    counter,
    counterSizeString,
    counterString,
    dark,
    dense,
    disabled,
    error,
    errorCount,
    errorMessages,
    filled,
    flat,
    fullWidth,
    height,
    hideDetails,
    hint,
    id,
    light,
    loaderHeight,
    loading,
    messages,
    multiple,
    outlined,
    persistentHint,
    placeholder,
    prefix,
    prependIcon,
    prependInnerIcon,
    reverse,
    rounded,
    shaped,
    showSize,
    singleLine,
    smallChips,
    solo,
    soloInverted,
    success,
    successMessages,
    suffix,
    truncateLength,
    type,
    validateOnBlur,
    allowFileTypes,
    acceptValue,
    imageRootPath,
    fileType,
    imageViewerClass,
    imageViewerProgressClass
  ) {
    this.appendIcon = appendIcon;
    this.appendOuterIcon = appendOuterIcon;
    this.autofocus = autofocus || false;
    this.backgroundColor = backgroundColor;
    this.chips = chips || false;
    this.clearIcon = clearIcon || "$clear";
    this.clearable = clearable || true;
    this.color = color;
    this.counter = counter;
    this.counterSizeString =
      counterSizeString || "$vuetify.fileInput.counterSize";
    this.counterString = counterString || "$vuetify.fileInput.counter";
    this.dark = dark || false;
    this.dense = dense || false;
    this.disabled = disabled || false;
    this.error = error || false;
    this.errorCount = errorCount || 1;
    this.errorMessages = errorMessages || [];
    this.filled = filled || false;
    this.flat = flat || false;
    this.fullWidth = fullWidth || false;
    this.height = height;
    this.hideDetails = hideDetails || false;
    this.hint = hint;
    this.id = id;
    this.light = light || false;
    this.loaderHeight = loaderHeight || 2;
    this.loading = loading || false;
    this.messages = messages || [];
    this.multiple = multiple || false;
    this.outlined = outlined || false;
    this.persistentHint = persistentHint || false;
    this.placeholder = placeholder;
    this.prefix = prefix;
    this.prependIcon = prependIcon || "$file";
    this.prependInnerIcon = prependInnerIcon;
    this.reverse = reverse || false;
    this.rounded = rounded || false;
    this.shaped = shaped || false;
    this.showSize = showSize || false;
    this.singleLine = singleLine || false;
    this.smallChips = smallChips || false;
    this.solo = solo || false;
    this.soloInverted = soloInverted || false;
    this.success = success || false;
    this.successMessages = successMessages || [];
    this.suffix = suffix;
    this.truncateLength = truncateLength || 22;
    this.type = type || "file";
    this.validateOnBlur = validateOnBlur || false;
    this.allowFileTypes = allowFileTypes || [
      "image/gif",
      "image/jpeg",
      "image/png",
      "image/svg"
    ];
    this.acceptValue = acceptValue || ".gif,.jpg,.png,.svg";
    this.imageRootPath = imageRootPath || "";
    this.fileType = fileType || "image";
    this.imageViewerClass = imageViewerClass || "grey lighten-2";
    this.imageViewerProgressClass =
      imageViewerProgressClass || "grey lighten-5";
  }
}

export default FileFieldClass;
