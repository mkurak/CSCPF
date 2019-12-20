class SelectClass {
  constructor(
    appendIcon,
    appendOuterIcon,
    attach,
    autofocus,
    backgroundColor,
    cacheItems,
    chips,
    clearIcon,
    clearable,
    color,
    counter,
    dark,
    deletableChips,
    dense,
    disabled,
    eager,
    error,
    errorCount,
    errorMessages,
    filled,
    filter,
    flat,
    fullWidth,
    height,
    hideDetails,
    hideSelected,
    hint,
    id,
    itemColor,
    itemDisabled,
    itemText,
    itemValue,
    items,
    light,
    loaderHeight,
    loading,
    menuProps,
    messages,
    multiple,
    noDataText,
    openOnClear,
    outlined,
    persistentHint,
    placeholder,
    prefix,
    prependIcon,
    prependInnerIcon,
    readonly,
    returnObject,
    reverse,
    rounded,
    shaped,
    singleLine,
    smallChips,
    solo,
    soloInverted,
    success,
    successMessages,
    suffix,
    type,
    validateOnBlur,
    value,
    valueComparator
  ) {
    this.appendIcon = appendIcon || "$dropdown";
    this.appendOuterIcon = appendOuterIcon;
    this.attach = attach || false;
    this.autofocus = autofocus || false;
    this.backgroundColor = backgroundColor;
    this.cacheItems = cacheItems || false;
    this.chips = chips || false;
    this.clearIcon = clearIcon || "$clear";
    this.clearable = clearable || false;
    this.color = color;
    this.counter = counter;
    this.dark = dark || false;
    this.deletableChips = deletableChips || false;
    this.dense = dense || false;
    this.disabled = disabled || false;
    this.eager = eager || false;
    this.error = error || false;
    this.errorCount = errorCount || 1;
    this.errorMessages = errorMessages || [];
    this.filled = filled || false;
    this.filter = filter;
    this.flat = flat || false;
    this.fullWidth = fullWidth || false;
    this.height = height;
    this.hideDetails = hideDetails || false;
    this.hideSelected = hideSelected || false;
    this.hint = hint;
    this.id = id;
    this.itemColor = itemColor || "primary";
    this.itemDisabled = itemDisabled || "disabled";
    this.itemText = itemText || "text";
    this.itemValue = itemValue || "value";
    this.items = items || [];
    this.light = light || false;
    this.loaderHeight = loaderHeight || 2;
    this.loading = loading || false;
    this.menuProps = menuProps;
    this.messages = messages || [];
    this.multiple = multiple || false;
    this.noDataText = noDataText || "$vuetify.noDataText";
    this.openOnClear = openOnClear || false;
    this.outlined = outlined || false;
    this.persistentHint = persistentHint || false;
    this.placeholder = placeholder;
    this.prefix = prefix;
    this.prependIcon = prependIcon;
    this.prependInnerIcon = prependInnerIcon;
    this.readonly = readonly || false;
    this.returnObject = returnObject || false;
    this.reverse = reverse || false;
    this.rounded = rounded || false;
    this.shaped = shaped || false;
    this.singleLine = singleLine || false;
    this.smallChips = smallChips || false;
    this.solo = solo || false;
    this.soloInverted = soloInverted || false;
    this.success = success || false;
    this.successMessages = successMessages || [];
    this.suffix = suffix;
    this.type = type || "text";
    this.validateOnBlur = validateOnBlur || false;
    this.value = value;
    this.valueComparator = valueComparator;
  }
}

export default SelectClass;
