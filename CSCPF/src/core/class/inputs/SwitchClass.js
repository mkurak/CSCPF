class SwitchClass {
  constructor(
    appendIcon,
    backgroundColor,
    color,
    dark,
    dense,
    disabled,
    error,
    errorCount,
    errorMessages,
    falseValue,
    flat,
    hideDetails,
    hint,
    id,
    inputValue,
    inset,
    label,
    light,
    loading,
    messages,
    multiple,
    persistentHint,
    prependIcon,
    readonly,
    ripple,
    success,
    successMessages,
    trueValue,
    validateOnBlur,
    valueComparator
  ) {
    this.appendIcon = appendIcon;
    this.backgroundColor = backgroundColor;
    this.color = color;
    this.dark = dark || false;
    this.dense = dense || false;
    this.disabled = disabled || false;
    this.error = error || false;
    this.errorCount = errorCount || 1;
    this.errorMessages = errorMessages || [];
    this.falseValue = falseValue;
    this.flat = flat || false;
    this.hideDetails = hideDetails || false;
    this.hint = hint;
    this.id = id;
    this.inputValue = inputValue;
    this.inset = inset || false;
    this.label = label;
    this.light = light || false;
    this.loading = loading || false;
    this.messages = messages || [];
    this.multiple = multiple || false;
    this.persistentHint = persistentHint || false;
    this.prependIcon = prependIcon;
    this.readonly = readonly || false;
    this.ripple = ripple || true;
    this.success = success || false;
    this.successMessages = successMessages || [];
    this.trueValue = trueValue;
    this.validateOnBlur = validateOnBlur || false;
    this.valueComparator = valueComparator;
  }
}

export default SwitchClass;
