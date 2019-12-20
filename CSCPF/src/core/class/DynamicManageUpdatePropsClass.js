class DynamicManageUpdatePropsClass {
  constructor(
    title,
    properties,
    actionName,
    loadingMsg,
    successTitle,
    successMsg,
    errorTitle,
    errorApiMsgs,
    hashCode,
    CancelBtnLabel,
    SaveBtnLabel
  ) {
    this.title = title || "Kayıt Güncelle";
    this.properties = properties || [];
    this.actionName = actionName || "";
    this.loadingMsg = loadingMsg || "Güncelleniyor...";
    this.successTitle = successTitle || "Güncellendi";
    this.successMsg = successMsg || "Kayıt güncellendi.";
    this.errorTitle = errorTitle || "Hata!";
    this.errorApiMsgs = errorApiMsgs || "";
    this.hashCode = hashCode || "";
    this.CancelBtnLabel = CancelBtnLabel || "İPTAL";
    this.SaveBtnLabel = SaveBtnLabel || "KAYDET";
  }
}

export default DynamicManageUpdatePropsClass;
