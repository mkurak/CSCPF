class TextFieldClass {
  constructor(
    appendIcon,
    appendOuterIcon,
    autofocus,
    backgroundColor,
    clearIcon,
    clearable,
    color,
    counter,
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
    outlined,
    persistentHint,
    placeholder,
    prefix,
    prependIcon,
    prependInnerIcon,
    readonly,
    reverse,
    rounded,
    shaped,
    singleLine,
    solo,
    soloInverted,
    success,
    successMessages,
    suffix,
    type,
    validateOnBlur
  ) {
    this.appendIcon = appendIcon;
    this.appendOuterIcon = appendOuterIcon;
    this.autofocus = autofocus || false;
    this.backgroundColor = backgroundColor;
    this.clearIcon = clearIcon || "$clear";
    this.clearable = clearable || false;
    this.color = color;
    this.counter = counter;
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
    this.outlined = outlined || false;
    this.persistentHint = persistentHint || false;
    this.placeholder = placeholder;
    this.prefix = prefix;
    this.prependIcon = prependIcon;
    this.prependInnerIcon = prependInnerIcon;
    this.readonly = readonly || false;
    this.reverse = reverse || false;
    this.rounded = rounded || false;
    this.shaped = shaped || false;
    this.singleLine = singleLine || false;
    this.solo = solo || false;
    this.soloInverted = soloInverted || false;
    this.success = success || false;
    this.successMessages = successMessages || [];
    this.suffix = suffix;
    this.type = type || "text";
    this.validateOnBlur = validateOnBlur || false;
  }
}

export default TextFieldClass;
