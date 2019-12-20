import DatatableClass from "@/core/class/DatatableClass";

class DynamicManageDatatablePropsClass {
  constructor(
    datatableProps,
    datatableClass,
    itemsHandler,
    itemsGetter,
    searchIcon,
    searchPlaceholder
  ) {
    this.datatableProps = datatableProps || new DatatableClass();
    this.datatableClass = datatableClass || "elevation-1";
    this.itemsHandler = itemsHandler;
    this.itemsGetter = itemsGetter || "";
    this.searchIcon = searchIcon || "mdi-database-search";
    this.searchPlaceholder = searchPlaceholder || "Kayıtlarda Arayın...";
  }
}

export default DynamicManageDatatablePropsClass;
