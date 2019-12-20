import Tools from "@/core/plugins/tools";

class DynamicManageProperty {
  constructor(
    name,
    inputType,
    colSize,
    label,
    value,
    sendDataOrderNumber,
    allowShowAdd,
    allowShowUpdate,
    saveValidationHandler,
    resetValueHandler,
    getValueHandler,
    setValueHandler,
    viewStatus,
    propertiesChangeEventHandler,
    inputClass,
    validationForAdd,
    validationForUpdate
  ) {
    this.name = name;
    this.inputType = inputType;
    this.colSize = colSize;
    this.label = label;
    this.value = value;
    this.sendDataOrderNumber = sendDataOrderNumber;
    this.allowShowAdd = allowShowAdd;
    this.allowShowUpdate = allowShowUpdate;
    this.saveValidationHandler = saveValidationHandler;
    this.resetValueHandler = resetValueHandler;
    this.getValueHandler = getValueHandler;
    this.setValueHandler = setValueHandler;
    this.viewStatus = viewStatus || true;
    this.propertiesChangeEventHandler = propertiesChangeEventHandler;
    this.inputClass = inputClass;
    this.validationForAdd = validationForAdd;
    this.validationForUpdate = validationForUpdate;
  }

  setValue(val) {
    if (!Tools.isNullOrEmpty(this.setValueHandler)) this.setValueHandler(val);
    else this.value = val;
  }

  getValue() {
    return !Tools.isNullOrEmpty(this.getValueHandler)
      ? this.getValueHandler()
      : this.value;
  }

  resetValue() {
    if (!Tools.isNullOrEmpty(this.resetValueHandler)) {
      this.resetValueHandler();
    } else {
      switch (this.inputType) {
        case "TextFieldInputComponent":
        case "WysiwygInputComponent":
          this.value = "";
          break;
        case "DatePickerInputComponent":
          this.value = new Date();
          break;
        case "FileFieldInputComponent":
          this.value = null;
          break;
        case "SwitchInputComponent":
          this.value = true;
          break;
        case "SelectInputComponent":
          this.value = 0;
          break;
      }
    }
  }

  getValidation(cursType) {
    let validation =
      cursType === "add" ? this.validationForAdd : this.validationForUpdate;

    let rtnValidation = Tools.isNullOrEmpty(validation) ? [] : validation;

    return rtnValidation;
  }

  execPropertiesChangeEvent(properties, changeSendBtnViewStatusHandler) {
    if (!Tools.isNullOrEmpty(this.propertiesChangeEventHandler))
      this.propertiesChangeEventHandler(
        properties,
        changeSendBtnViewStatusHandler
      );
  }
}

export default DynamicManageProperty;
