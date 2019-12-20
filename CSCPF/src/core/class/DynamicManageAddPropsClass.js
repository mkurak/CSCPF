class DynamicManageAddPropsClass {
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
    this.title = title || "Yeni Kayıt";
    this.properties = properties || [];
    this.ationName = actionName || "";
    this.loadingMsg = loadingMsg || "İşlem gerçekleştiriliyor...";
    this.successTitle = successTitle || "Eklendi";
    this.successMsg = successMsg || "Kayıt başarılı bir şekilde eklendi.";
    this.errorTitle = errorTitle || "Hata!";
    this.errorApiMsgs = errorApiMsgs || "";
    this.hashCode = hashCode || "";
    this.CancelBtnLabel = CancelBtnLabel || "İPTAL";
    this.SaveBtnLabel = SaveBtnLabel || "KAYDET";
  }
}

export default DynamicManageAddPropsClass;
