import DynamicManageAddPropsClass from "@/core/class/DynamicManageAddPropsClass";
import DynamicManageDatatablePropsClass from "@/core/class/DynamicManageDatatablePropsClass";
import DynamicManageUpdatePropsClass from "@/core/class/DynamicManageUpdatePropsClass";

class DynamicManageViewPropsClass {
  constructor(
    cardTitleClasses,
    cardTitle,
    datatablePropsClass,
    addPropAllow,
    addPropRole,
    addPropBtnClass,
    addPropBtnColor,
    addPropBtnElevation,
    addPropBtnText,
    addPropFormViewerWidth,
    addPropFormTitle,
    addPropFormStoreActionName,
    addPropFormLoadingMsg,
    addPropsClass,
    updatePropAllow,
    updatePropRole,
    updatePropIcon,
    updatePropText,
    updatePropFormViewerWidth,
    updatePropsClass,
    removePropAllow,
    removePropRole,
    removePropIcon,
    removePropText,
    removePropConfirmTitle,
    removePropConfirmMsg,
    removePropConfirmInfo,
    removePropLoadingMsg,
    removePropActionName,
    removePropSuccessTitle,
    removePropSuccessMsg,
    removePropErrorTitle,
    removePropApiErrorState,
    customAddHandler,
    customUpdateHandler,
    customRemoveHandler
  ) {
    this.cardTitleClasses = cardTitleClasses || ["white--text", "headline"];
    this.cardTitle = cardTitle || "";
    this.datatablePropsClass =
      datatablePropsClass || new DynamicManageDatatablePropsClass();
    this.addPropAllow = addPropAllow || true;
    this.addPropRole = addPropRole || "";
    this.addPropBtnClass = addPropBtnClass || "ma-2 white--text";
    this.addPropBtnColor = addPropBtnColor || "success";
    this.addPropBtnElevation = addPropBtnElevation || 0;
    this.addPropBtnText = addPropBtnText || "YENİ KAYIT EKLE";
    this.addPropFormViewerWidth = addPropFormViewerWidth || 800;
    this.addPropFormTitle = addPropFormTitle || "Yeni Kayıt";
    this.addPropFormStoreActionName = addPropFormStoreActionName || "";
    this.addPropFormLoadingMsg =
      addPropFormLoadingMsg || "İşlem gerçekleştiriliyor...";
    this.addPropsClass = addPropsClass || new DynamicManageAddPropsClass();
    this.updatePropAllow = updatePropAllow || true;
    this.updatePropRole = updatePropRole || "";
    this.updatePropIcon = updatePropIcon || "mdi-pencil";
    this.updatePropText = updatePropText || "Güncelle";
    this.updatePropFormViewerWidth = updatePropFormViewerWidth || 800;
    this.updatePropsClass =
      updatePropsClass || new DynamicManageUpdatePropsClass();
    this.removePropAllow = removePropAllow || true;
    this.removePropRole = removePropRole || "";
    this.removePropIcon = removePropIcon || "mdi-delete";
    this.removePropText = removePropText || "Sil";
    this.removePropConfirmTitle = removePropConfirmTitle || "İşlem Onayı";
    this.removePropConfirmMsg =
      removePropConfirmMsg || "Silmek istediğinize emin misiniz?";
    this.removePropConfirmInfo = removePropConfirmInfo || "";
    this.removePropLoadingMsg = removePropLoadingMsg || "Siliniyor...";
    this.removePropActionName = removePropActionName || "";
    this.removePropSuccessTitle = removePropSuccessTitle || "Siliniyor";
    this.removePropSuccessMsg = removePropSuccessMsg || "Kayıt silindi.";
    this.removePropErrorTitle = removePropErrorTitle || "Hata";
    this.removePropApiErrorState = removePropApiErrorState || "Hata";
    this.customAddHandler = customAddHandler;
    this.customUpdateHandler = customUpdateHandler;
    this.customRemoveHandler = customRemoveHandler;
  }
}

export default DynamicManageViewPropsClass;
